using CappannaHelper.Api.Identity.ComponentModel.User;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace CappannaHelper.Api.Tests.Identity.ComponentModel.User
{
    public class ApplicationUserManagerTests
    {
        private readonly Mock<UserManager<ApplicationUser>> _manager;
        private readonly Mock<ApplicationDbContext> _context;

        public ApplicationUserManagerTests()
        {
            var userValidators = new [] { new Mock<IUserValidator<ApplicationUser>>().Object };
            var passwordValidators = new [] { new Mock<IPasswordValidator<ApplicationUser>>().Object };
            _manager = new Mock<UserManager<ApplicationUser>>(
                new Mock<IUserStore<ApplicationUser>>().Object,
                new Mock<IOptions<IdentityOptions>>().Object,
                new Mock<IPasswordHasher<ApplicationUser>>().Object,
                userValidators,
                passwordValidators,
                new Mock<ILookupNormalizer>().Object,
                new Mock<IdentityErrorDescriber>().Object,
                new Mock<IServiceProvider>().Object,
                new Mock<ILogger<UserManager<ApplicationUser>>>().Object
            );

            _context = new Mock<ApplicationDbContext>();
        }

        [Fact]
        public void ThrowsIf_UserManager_IsNull()
        {
            Assert.Throws<ArgumentNullException>(() => new ApplicationUserManager(null, _context.Object));
        }

        [Fact]
        public void ThrowsIf_Context_IsNull()
        {
            Assert.Throws<ArgumentNullException>(() => new ApplicationUserManager(_manager.Object, null));
        }

        [Fact]
        public async Task CreateAsync_Calls_UserManager_CreateAsync_Method()
        {
            var called = false;
            
            _manager.Setup(m => m.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>())).Callback(() => called = true);
            var userManager = new ApplicationUserManager(_manager.Object, _context.Object);

            try
            {
                await userManager.CreateAsync(new ApplicationUser(), string.Empty);
            }
            catch
            { }

            Assert.True(called);
        }

        [Fact]
        public async Task FindByNameAsync_Calls_UserManager_FindByNameAsync_Method()
        {
            var called = false;
            
            _manager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).Callback(() => called = true);
            var userManager = new ApplicationUserManager(_manager.Object, _context.Object);

            try
            {
                await userManager.FindByNameAsync(string.Empty);
            }
            catch
            { }

            Assert.True(called);
        }
    }
}