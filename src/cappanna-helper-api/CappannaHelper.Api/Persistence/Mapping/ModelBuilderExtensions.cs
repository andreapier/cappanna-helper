using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public static class ModelBuilderExtensions
    {
        public static ModelBuilder MapOrderEntities(this ModelBuilder builder)
        {
            return builder
                .MapChOrder()
                .MapChOrderOperation()
                .MapOperationType()
                .MapMenuDetail()
                .MapOrderDetail()
                .MapShift()
                .MapSetting()
                .MapUserSetting()
                .MapStand();
        }

        public static ModelBuilder MapChOrder(this ModelBuilder builder)
        {
            var mapping = new ChOrderMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapChOrderOperation(this ModelBuilder builder)
        {
            var mapping = new ChOrderOperationMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapOperationType(this ModelBuilder builder)
        {
            var mapping = new OperationTypeMapping(builder);
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

        public static ModelBuilder MapShift(this ModelBuilder builder)
        {
            var mapping = new ShiftMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapSetting(this ModelBuilder builder)
        {
            var mapping = new SettingMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapUserSetting(this ModelBuilder builder)
        {
            var mapping = new UserSettingMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapStand(this ModelBuilder builder)
        {
            var mapping = new StandMapping(builder);
            mapping.Build();
            return builder;
        }
    }
}