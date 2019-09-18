using System;
using System.Threading;
using System.Threading.Tasks;
using CappannaHelper.Api.Controllers;
using CappannaHelper.Api.Identity.ComponentModel.SignIn;
using CappannaHelper.Api.Identity.ComponentModel.User;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Models;
using CappannaHelper.Api.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace CappannaHelper.Api.Tests.Controller
{
    public class AccountControllerTests
    {
        [Fact]
        public void Throws_With_Null_ApplicationUserManager()
        {
            Assert.Throws<ArgumentNullException>(() => new AccountController(
                null,
                new Mock<IApplicationSignInManager>().Object,
                CreateContext().Object,
                new Mock<IConfiguration>().Object));
        }

        [Fact]
        public void Throws_With_Null_ApplicationSignInManager()
        {
            Assert.Throws<ArgumentNullException>(() => new AccountController(
                new Mock<IApplicationUserManager>().Object,
                null,
                CreateContext().Object,
                new Mock<IConfiguration>().Object));
        }

        [Fact]
        public void Throws_With_Null_ApplicationDbContext()
        {
            Assert.Throws<ArgumentNullException>(() => new AccountController(
                new Mock<IApplicationUserManager>().Object,
                new Mock<IApplicationSignInManager>().Object,
                null,
                new Mock<IConfiguration>().Object));
        }

        [Fact]
        public void Throws_With_Null_Configuration()
        {
            Assert.Throws<ArgumentNullException>(() => new AccountController(
                new Mock<IApplicationUserManager>().Object,
                new Mock<IApplicationSignInManager>().Object,
                CreateContext().Object,
                null));
        }

        [Fact]
        public async Task Signup_User_IfValid()
        {
            var expectedUser = new ApplicationUser();
            var userManager = new Mock<IApplicationUserManager>();
            userManager.Setup(m => m.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>())).Returns(Task.FromResult(IdentityResult.Success));
            userManager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).Returns(Task.FromResult(expectedUser));
            var context = CreateContext();
            using (var accountController = new AccountController(
                userManager.Object,
                new Mock<IApplicationSignInManager>().Object,
                context.Object,
                new Mock<IConfiguration>().Object))
            {
                var signupData = new SignupModel
                {
                    Username = "test@test.it",
                    FirstName = "test",
                    LastName = "test",
                    Password = "test"
                };

                var httpResult = await accountController.Signup(signupData);

                var ok = Assert.IsAssignableFrom<OkObjectResult>(httpResult);
                var actualUser = Assert.IsAssignableFrom<ApplicationUser>(ok.Value);
                Assert.Equal(expectedUser, actualUser);
            }
        }

        [Fact]
        public async Task Fails_If_Signup_Fails()
        {
            var expectedMessage = "Test error";
            var userManager = new Mock<IApplicationUserManager>();
            userManager.Setup(m => m.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>())).Returns(Task.FromResult(IdentityResult.Failed(new IdentityError
            {
                Code = "Test",
                Description = expectedMessage
            })));
            var context = CreateContext();
            using (var accountController = new AccountController(
                userManager.Object,
                new Mock<IApplicationSignInManager>().Object,
                context.Object,
                new Mock<IConfiguration>().Object))
            {
                var signupData = new SignupModel
                {
                    Username = "test@test.it",
                    FirstName = "test",
                    LastName = "test",
                    Password = "test"
                };

                var actualException = await Assert.ThrowsAsync<Exception>(async () => await accountController.Signup(signupData));

                Assert.Equal(expectedMessage, actualException.Message);
            }
        }

        [Fact]
        public async Task Signin_User_IfValid()
        {
            var expectedUser = new ApplicationUser
            {
                UserName = "test"
            };
            var userManager = new Mock<IApplicationUserManager>();
            userManager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).Returns(Task.FromResult(expectedUser));
            var signInManager = new Mock<IApplicationSignInManager>();
            signInManager.Setup(m => m.PasswordSignInAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>())).Returns(Task.FromResult(Microsoft.AspNetCore.Identity.SignInResult.Success));
            var configuration = new Mock<IConfiguration>();
            configuration.Setup(c => c["JwtKey"]).Returns("SOME_RANDOM_KEY_DO_NOT_SHARE");
            configuration.Setup(c => c["JwtExpireDays"]).Returns("1");
            configuration.Setup(c => c["JwtIssuer"]).Returns("http://cappannahelper.it");
            var context = CreateContext();
            using (var accountController = new AccountController(
                userManager.Object,
                signInManager.Object,
                context.Object,
                configuration.Object))
            {
                var signinData = new SigninModel
                {
                    Username = "test",
                    Password = "test"
                };

                var httpResult = await accountController.Signin(signinData);

                var ok = Assert.IsAssignableFrom<OkObjectResult>(httpResult);
                var signInResult = Assert.IsAssignableFrom<SigninResultModel>(ok.Value);
                Assert.Equal(expectedUser.UserName, signInResult.Username);
            }
        }

        [Fact]
        public async Task Returns_NotFound_If_User_Does_Not_Exist()
        {
            var userManager = new Mock<IApplicationUserManager>();
            userManager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).Returns(Task.FromResult<ApplicationUser>(null));
            var context = CreateContext();
            using (var accountController = new AccountController(
                userManager.Object,
                new Mock<IApplicationSignInManager>().Object,
                context.Object,
                new Mock<IConfiguration>().Object))
            {
                var signinData = new SigninModel
                {
                    Username = "test",
                    Password = "test"
                };

                var httpResult = await accountController.Signin(signinData);

                Assert.IsAssignableFrom<NotFoundResult>(httpResult);
            }
        }

        [Fact]
        public async Task Returns_TooManyRequests_If_User_Is_LockedOut()
        {
            var userManager = new Mock<IApplicationUserManager>();
            userManager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).Returns(Task.FromResult(new ApplicationUser()));
            var signInManager = new Mock<IApplicationSignInManager>();
            signInManager.Setup(m => m.PasswordSignInAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>())).Returns(Task.FromResult(Microsoft.AspNetCore.Identity.SignInResult.LockedOut));
            var context = CreateContext();
            using (var accountController = new AccountController(
                userManager.Object,
                signInManager.Object,
                context.Object,
                new Mock<IConfiguration>().Object))
            {
                var signinData = new SigninModel
                {
                    Username = "test",
                    Password = "test"
                };

                var httpResult = await accountController.Signin(signinData);

                var status = Assert.IsAssignableFrom<StatusCodeResult>(httpResult);
                Assert.Equal(429, status.StatusCode);
            }
        }

        [Fact]
        public async Task Returns_Unauthorized_If_User_IsNot_Authorized()
        {
            var userManager = new Mock<IApplicationUserManager>();
            userManager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).Returns(Task.FromResult(new ApplicationUser()));
            var signInManager = new Mock<IApplicationSignInManager>();
            signInManager.Setup(m => m.PasswordSignInAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>())).Returns(Task.FromResult(Microsoft.AspNetCore.Identity.SignInResult.NotAllowed));
            var context = CreateContext();
            using (var accountController = new AccountController(
                userManager.Object,
                signInManager.Object,
                context.Object,
                new Mock<IConfiguration>().Object))
            {
                var signinData = new SigninModel
                {
                    Username = "test",
                    Password = "test"
                };

                var httpResult = await accountController.Signin(signinData);

                Assert.IsAssignableFrom<UnauthorizedResult>(httpResult);
            }
        }

        [Fact]
        public async Task Throws_IfNot_Handled()
        {
            var userManager = new Mock<IApplicationUserManager>();
            userManager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).Returns(Task.FromResult(new ApplicationUser()));
            var signInManager = new Mock<IApplicationSignInManager>();
            signInManager.Setup(m => m.PasswordSignInAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>())).Returns(Task.FromResult(Microsoft.AspNetCore.Identity.SignInResult.TwoFactorRequired));
            var context = CreateContext();
            using (var accountController = new AccountController(
                userManager.Object,
                signInManager.Object,
                context.Object,
                new Mock<IConfiguration>().Object))
            {
                var signinData = new SigninModel
                {
                    Username = "test",
                    Password = "test"
                };

                await Assert.ThrowsAsync<NotImplementedException>(async () => await accountController.Signin(signinData));
            }
        }

        [Fact]
        public async Task Signout_User()
        {
            var context = CreateContext();
            using (var accountController = new AccountController(
                new Mock<IApplicationUserManager>().Object,
                new Mock<IApplicationSignInManager>().Object,
                context.Object,
                new Mock<IConfiguration>().Object))
            {

                var httpResult = await accountController.Signout();

                Assert.IsAssignableFrom<OkResult>(httpResult);
            }
        }

        private Mock<ApplicationDbContext> CreateContext()
        {
            var context = new Mock<ApplicationDbContext>(new DbContextOptionsBuilder<ApplicationDbContext>().Options);
            var database = new Mock<DatabaseFacade>(context.Object);

            database.Setup(d => d.BeginTransactionAsync(It.IsAny<CancellationToken>()));
            database.Setup(d => d.CommitTransaction());
            database.Setup(d => d.RollbackTransaction());
            context.Setup(c => c.Database).Returns(database.Object);

            return context;
        }
    }
}