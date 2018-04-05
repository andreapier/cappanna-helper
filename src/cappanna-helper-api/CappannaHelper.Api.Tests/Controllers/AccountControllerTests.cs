using CappannaHelper.Api.Controllers;
using CappannaHelper.Api.Identity.ComponentModel.SignIn;
using CappannaHelper.Api.Identity.ComponentModel.User;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace CappannaHelper.Api.Tests.Controller
{
    public class AccountControllerTests
    {
        [Fact]
        public void Throws_With_Null_ApplicationUserManager()
        {
            Assert.Throws<ArgumentNullException>(() => new AccountController(null, new Mock<IApplicationSignInManager>().Object));
        }

        [Fact]
        public void Throws_With_Null_ApplicationSignInManager()
        {
            Assert.Throws<ArgumentNullException>(() => new AccountController(new Mock<IApplicationUserManager>().Object, null));
        }

        [Fact]
        public async Task Registers_User_IfValid()
        {
            var expectedUser = new ApplicationUser();
            var userManager = new Mock<IApplicationUserManager>();
            userManager.Setup(m => m.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>())).Returns(Task.FromResult(IdentityResult.Success));
            userManager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).Returns(Task.FromResult(expectedUser));
            var accountController = new AccountController(userManager.Object, new Mock<IApplicationSignInManager>().Object);
            var registrationData = new UserRegistrationModel
            {
                Email = "test@test.it",
                FirstName = "test",
                LastName = "test",
                Password = "test"
            };

            var httpResult = await accountController.Register(registrationData);

            var ok = Assert.IsAssignableFrom<OkObjectResult>(httpResult);
            var actualUser = Assert.IsAssignableFrom<ApplicationUser>(ok.Value);
            Assert.Equal(expectedUser, actualUser);
        }

        [Fact]
        public async Task Fails_If_UserCreation_Fails()
        {
            var expectedMessage = "Test error";
            var userManager = new Mock<IApplicationUserManager>();
            userManager.Setup(m => m.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>())).Returns(Task.FromResult(IdentityResult.Failed(new IdentityError
            {
                Code = "Test",
                Description = expectedMessage
            })));
            var accountController = new AccountController(userManager.Object, new Mock<IApplicationSignInManager>().Object);
            var registrationData = new UserRegistrationModel
            {
                Email = "test@test.it",
                FirstName = "test",
                LastName = "test",
                Password = "test"
            };

            var actualException = await Assert.ThrowsAsync<Exception>(async () => await accountController.Register(registrationData));

            Assert.Equal(expectedMessage, actualException.Message);
        }

        [Fact]
        public async Task Login_User_IfValid()
        {
            var expectedUser = new ApplicationUser();
            var userManager = new Mock<IApplicationUserManager>();
            userManager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).Returns(Task.FromResult(expectedUser));
            var signInManager = new Mock<IApplicationSignInManager>();
            signInManager.Setup(m => m.PasswordSignInAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>())).Returns(Task.FromResult(Microsoft.AspNetCore.Identity.SignInResult.Success));
            var accountController = new AccountController(userManager.Object, signInManager.Object);
            var loginData = new SigninData
            {
                Username = "test",
                Password = "test"
            };

            var httpResult = await accountController.Signin(loginData);

            var ok = Assert.IsAssignableFrom<OkObjectResult>(httpResult);
            var actualUser = Assert.IsAssignableFrom<ApplicationUser>(ok.Value);
            Assert.Equal(expectedUser, actualUser);
        }

        [Fact]
        public async Task Returns_TooManyRequests_If_User_Is_LockedOut()
        {
            var signInManager = new Mock<IApplicationSignInManager>();
            signInManager.Setup(m => m.PasswordSignInAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>())).Returns(Task.FromResult(Microsoft.AspNetCore.Identity.SignInResult.LockedOut));
            var accountController = new AccountController(new Mock<IApplicationUserManager>().Object, signInManager.Object);
            var loginData = new SigninData
            {
                Username = "test",
                Password = "test"
            };

            var httpResult = await accountController.Signin(loginData);

            var status = Assert.IsAssignableFrom<StatusCodeResult>(httpResult);
            Assert.Equal(429, status.StatusCode);
        }

        [Fact]
        public async Task Returns_Unauthorized_If_User_IsNot_Authorized()
        {
            var signInManager = new Mock<IApplicationSignInManager>();
            signInManager.Setup(m => m.PasswordSignInAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>())).Returns(Task.FromResult(Microsoft.AspNetCore.Identity.SignInResult.NotAllowed));
            var accountController = new AccountController(new Mock<IApplicationUserManager>().Object, signInManager.Object);
            var loginData = new SigninData
            {
                Username = "test",
                Password = "test"
            };

            var httpResult = await accountController.Signin(loginData);

            Assert.IsAssignableFrom<UnauthorizedResult>(httpResult);
        }

        [Fact]
        public async Task Throws_IfNot_Handled()
        {
            var signInManager = new Mock<IApplicationSignInManager>();
            signInManager.Setup(m => m.PasswordSignInAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>())).Returns(Task.FromResult(Microsoft.AspNetCore.Identity.SignInResult.TwoFactorRequired));
            var accountController = new AccountController(new Mock<IApplicationUserManager>().Object, signInManager.Object);
            var loginData = new SigninData
            {
                Username = "test",
                Password = "test"
            };

            await Assert.ThrowsAsync<NotImplementedException>(async () => await accountController.Signin(loginData));
        }

        [Fact]
        public async Task Logout_User()
        {
            var accountController = new AccountController(new Mock<IApplicationUserManager>().Object, new Mock<IApplicationSignInManager>().Object);
            
            var httpResult = await accountController.Signout();

            Assert.IsAssignableFrom<OkResult>(httpResult);
        }
    }
}