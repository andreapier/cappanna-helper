using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class NotificationMapping : EntityMapping<Notification>
    {
        public NotificationMapping(ModelBuilder builder)
            : base(builder) { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<Notification> entityBuilder)
        {
            entityBuilder.ToTable("Notifications");

            entityBuilder.Property(o => o.Id).IsRequired().ValueGeneratedOnAdd();
            entityBuilder.Property(o => o.Type).IsRequired();
            entityBuilder.Property(o => o.Message).IsRequired();
            entityBuilder.Property(o => o.Notes);
            entityBuilder.Property(o => o.CreationTimestamp).IsRequired().HasDefaultValueSql("CURRENT_TIMESTAMP");
            entityBuilder.Property(o => o.Completed).IsRequired();

            entityBuilder.HasIndex(o => o.Completed);
            entityBuilder.HasIndex(o => o.CreationTimestamp);
        }
    }
}
