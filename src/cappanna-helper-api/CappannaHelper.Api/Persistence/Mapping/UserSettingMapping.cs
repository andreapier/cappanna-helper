using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class UserSettingMapping : EntityMapping<UserSetting>
    {
        public UserSettingMapping(ModelBuilder builder)
            : base(builder) { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<UserSetting> entityBuilder)
        {
            entityBuilder.ToTable("UserSettings");

            entityBuilder.Property(o => o.Id).IsRequired().ValueGeneratedOnAdd();
            entityBuilder.Property(o => o.StandId).IsRequired();
        }
    }
}
