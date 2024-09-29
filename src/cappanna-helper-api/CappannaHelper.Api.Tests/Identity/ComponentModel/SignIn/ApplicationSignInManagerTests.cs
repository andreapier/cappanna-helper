using CappannaHelper.Api.Identity.ComponentModel.SignIn;
using CappannaHelper.Api.Identity.DataModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace CappannaHelper.Api.Tests.Identity.ComponentModel.SignIn
{
    public class ApplicationSignInManagerTests
    {
        private readonly Mock<SignInManager<ApplicationUser>> _manager;

        public ApplicationSignInManagerTests()
        {
            var identityOptions = new Mock<IOptions<IdentityOptions>>().Object;
            var userValidators = new [] { new Mock<IUserValidator<ApplicationUser>>().Object };
            var passwordValidators = new [] { new Mock<IPasswordValidator<ApplicationUser>>().Object };
            _manager = new Mock<SignInManager<ApplicationUser>>(
                new UserManager<ApplicationUser>(
                    new Mock<IUserStore<ApplicationUser>>().Object,
                    identityOptions,
                    new Mock<IPasswordHasher<ApplicationUser>>().Object,
                    userValidators,
                    passwordValidators,
                    new Mock<ILookupNormalizer>().Object,
                    new Mock<IdentityErrorDescriber>().Object,
                    new Mock<IServiceProvider>().Object,
                    new Mock<ILogger<UserManager<ApplicationUser>>>().Object),
                new Mock<IHttpContextAccessor>().Object,
                new Mock<IUserClaimsPrincipalFactory<ApplicationUser>>().Object,
                identityOptions,
                new Mock<ILogger<SignInManager<ApplicationUser>>>().Object,
                new Mock<IAuthenticationSchemeProvider>().Object);
        }

        [Fact]
        public void ThrowsIf_SignInManager_IsNull()
        {
            Assert.Throws<ArgumentNullException>(() => new ApplicationSignInManager(null));
        }

        [Fact]
        public async Task PasswordSignInAsync_Calls_SignInManager_PasswordSignInAsync_Method()
        {
            var called = false;
            
            _manager.Setup(m => m.PasswordSignInAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>())).Callback(() => called = true);
            var userManager = new ApplicationSignInManager(_manager.Object);

            try
            {
                await userManager.PasswordSignInAsync(new ApplicationUser(), string.Empty, false, false);
            }
            catch
            { }

            Assert.True(called);
        }

        [Fact]
        public async Task SignInAsync_Calls_SignInManager_SignInAsync_Method()
        {
            var called = false;
            
            _manager.Setup(m => m.SignInAsync(It.IsAny<ApplicationUser>(), It.IsAny<bool>(), It.IsAny<string>())).Callback(() => called = true);
            var userManager = new ApplicationSignInManager(_manager.Object);

            try
            {
                await userManager.SignInAsync(new ApplicationUser(), false, string.Empty);
            }
            catch
            { }

            Assert.True(called);
        }

        [Fact]
        public async Task SignOutAsync_Calls_SignInManager_SignOutAsync_Method()
        {
            var called = false;
            
            _manager.Setup(m => m.SignOutAsync()).Callback(() => called = true);
            var userManager = new ApplicationSignInManager(_manager.Object);

            try
            {
                await userManager.SignOutAsync();
            }
            catch
            { }

            Assert.True(called);
        }
    }
}