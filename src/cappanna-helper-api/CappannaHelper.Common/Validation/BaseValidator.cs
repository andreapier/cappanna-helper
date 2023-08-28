using CappannaHelper.Common.Core;
using FluentValidation;

namespace CappannaHelper.Common.Validation;

public class BaseValidator<T> : AbstractValidator<T>
    where T : IIdObject
{
    public BaseValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThanOrEqualTo(x => 0);
    }
}
