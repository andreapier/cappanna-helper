using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Setup
{
    public class SetupMiddleware : IMiddleware
    {
        private static readonly SemaphoreSlim _semaphoreSlim;

        private static bool _initialized;

        private readonly ISetupHelper _setupHelper;
        
        static SetupMiddleware()
        {
            _semaphoreSlim = new SemaphoreSlim(1, 1);
        }

        public SetupMiddleware(ISetupHelper setupHelper)
        {
            _setupHelper = setupHelper ?? throw new ArgumentNullException(nameof(setupHelper));
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            await _semaphoreSlim.WaitAsync();

            try
            {
                if (!_initialized)
                {
                    var errors = await _setupHelper.SetupAsync();

                    if (errors.Any())
                    {
                        throw new Exception(string.Join($",{Environment.NewLine}", errors));
                    }

                    _initialized = true;
                }
            }
            finally
            {
                _semaphoreSlim.Release();
            }
            
            await next(context);
        }
    }
}
