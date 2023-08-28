using FluentValidation;

namespace CappannaHelper.Common.Tests.Utils;

public class TestValidator: AbstractValidator<TestEntity>
{
    public TestValidator()
    {
        RuleFor(x => x.Id).GreaterThanOrEqualTo(0);
    }
}
