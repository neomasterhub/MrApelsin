using System.Reflection;
using Common.Exstensions;
using Common.Versioning;

namespace AppInfo;

public class Info
{
    private static readonly Info _instance = new();
    public readonly AppVersion AppVersion;

    private Info() => AppVersion = Assembly.GetExecutingAssembly().GetAppVersion();
    public static Info Instance => _instance;
}
