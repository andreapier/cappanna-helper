using CappannaHelper.Api.Identity.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace CappannaHelper.Api.Tests.Identity.ComponentModel.Extensions
{
    public class ApplicationIdentityServiceCollectionExtensionsTests
    {
        [Fact]
        public void AddApplicationIdentity_Adds_ApplicationUserManager_ToServiceCollection()
        {
            var services = new ServiceCollection();
            var countBefore = services.Count;
            
            ApplicationIdentityServiceCollectionExtensions.AddApplicationIdentity(services);

            Assert.Equal(countBefore + 2, services.Count);
        }
    }
}