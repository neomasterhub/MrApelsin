using System.Reflection;
using Common.Versioning;

namespace Common.Exstensions;

public static class AssemblyExtensions
{
    public static AppVersion GetAppVersion(this Assembly assembly) => assembly
        .GetCustomAttributes(typeof(AppVersionAttribute), false)
        .Cast<AppVersionAttribute>()
        .Single().AppVersion;
}
