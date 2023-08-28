using CappannaHelper.Common.Validation;
using FluentValidation;

namespace CappannaHelper.Tenant.Validation;

public class TenantDtoValidator : BaseValidator<TenantDto>
{
    public TenantDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MinimumLength(5);
    }
}
