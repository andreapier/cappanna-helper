using AutoMapper;
using CappannaHelper.Common.Utils;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Common.Tests.Utils;

public class TypeExtensionsTest
{
    [Fact]
    public void GetAssembliesWithImplementations_Finds_Types_For_IEntityTypeConfiguration()
    {
        var sut = typeof(IEntityTypeConfiguration<>);
        var actual = sut.GetAssembliesWithImplementations();

        Assert.NotNull(actual);
        Assert.NotEmpty(actual);
        Assert.Contains(actual, x => x.GetName().Name == "CappannaHelper.Common.Tests");
    }

    [Fact]
    public void GetAssembliesWithImplementations_Finds_Types_For_IValidator()
    {
        var sut = typeof(IValidator<>);
        var actual = sut.GetAssembliesWithImplementations();

        Assert.NotNull(actual);
        Assert.NotEmpty(actual);
        Assert.Contains(actual, x => x.GetName().Name == "CappannaHelper.Common.Tests");
    }

    [Fact]
    public void GetAssembliesWithImplementations_Finds_Types_For_Profile()
    {
        var sut = typeof(Profile);
        var actual = sut.GetAssembliesWithImplementations();

        Assert.NotNull(actual);
        Assert.NotEmpty(actual);
        Assert.Contains(actual, x => x.GetName().Name == "CappannaHelper.Common.Tests");
    }
}
