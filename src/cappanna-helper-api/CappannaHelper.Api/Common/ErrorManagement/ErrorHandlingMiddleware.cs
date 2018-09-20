using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CappannaHelper.Api.Common.ErrorManagement
{
    public class ErrorHandlingMiddleware
    {
        private readonly static JsonSerializerSettings _jsonSettings;

        private readonly RequestDelegate next;

        static ErrorHandlingMiddleware()
        {
            _jsonSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
        }

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch(Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError;
            var result = JsonConvert.SerializeObject(new
            {
                exception.Message,
                exception.StackTrace
            }, _jsonSettings);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int) code;

            await context.Response.WriteAsync(result);
        }
    }
}
