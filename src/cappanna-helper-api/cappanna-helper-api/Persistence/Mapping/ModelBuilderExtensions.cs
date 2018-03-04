using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public static class ModelBuilderExtensions
    {
        public static ModelBuilder MapOrderEntities(this ModelBuilder builder)
        {
            return builder
                .MapChOrder()
                .MapMenuDetail()
                .MapOrderDetail();
        }

        public static ModelBuilder MapChOrder(this ModelBuilder builder)
        {
            var mapping = new ChOrderMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapOrderDetail(this ModelBuilder builder)
        {
            var mapping = new OrderDetailMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapMenuDetail(this ModelBuilder builder)
        {
            var mapping = new MenuDetailMapping(builder);
            mapping.Build();
            return builder;
        }
    }
}