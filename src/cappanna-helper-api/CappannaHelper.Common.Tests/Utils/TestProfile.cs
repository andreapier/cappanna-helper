using AutoMapper;

namespace CappannaHelper.Common.Tests.Utils;

public class TestProfile : Profile
{
    public TestProfile()
    {
        CreateMap<TestEntity, TestDto>();
    }
}
