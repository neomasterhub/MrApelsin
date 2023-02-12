namespace Common.Versioning;

[AttributeUsage(AttributeTargets.Assembly)]
public class AppVersionAttribute : Attribute
{
    public readonly AppVersion AppVersion;

    public AppVersionAttribute(string versionNumber, string buildDatetime)
    {
        AppVersion = new AppVersion(versionNumber, buildDatetime);
    }
}
