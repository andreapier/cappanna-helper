using System.Reflection;
using System.Xml.Linq;

namespace CappannaHelper.Common.Utils;

public static class TypeExtensions
{
    public static IEnumerable<Type> GetImplementations(this Type interfaceType)
    {
        var result = AppDomain.CurrentDomain.GetAssemblies()
            .SelectMany(a => a.GetTypes())
            .Where(x => !x.IsAbstract && x.IsClass && interfaceType.IsAssignableFrom(x));
        return result;
    }

    public static IEnumerable<Assembly> GetAssembliesWithImplementations(this Type type)
    {
        if (type.IsInterface)
        {
            return type.GetAssembliesWithImplementationsForInterface();
        }

        return type.GetAssembliesWithImplementationsForClass();
    }

    private static IEnumerable<Assembly> GetAssembliesWithImplementationsForInterface(this Type interfaceType)
    {
        var result = AppDomain.CurrentDomain.GetAssemblies()
            .SelectMany(a => a.GetTypes())
            .Where(x => !x.IsAbstract && x.IsClass)
            .Where(x =>
            {
                var typeInterfaces = x.GetInterfaces();
                foreach (var typeInterface in typeInterfaces)
                {
                    if (typeInterface == interfaceType)
                    {
                        return true;
                    }

                    if (
                        interfaceType.IsGenericTypeDefinition
                        && typeInterface.IsGenericType
                        && typeInterface.GetGenericTypeDefinition() == interfaceType)
                    {
                        return true;
                    }
                }
                return false;
            })
            .Select(x => x.Assembly)
            .Distinct()
            .ToList();
        return result;
    }

    private static IEnumerable<Assembly> GetAssembliesWithImplementationsForClass(this Type classType)
    {
        var result = AppDomain.CurrentDomain.GetAssemblies()
            .SelectMany(a => a.GetTypes())
            .Where(x => !x.IsAbstract && x.IsClass && x.IsSubclassOf(classType))
            .Select(x => x.Assembly)
            .Distinct();
        return result;
    }
}
