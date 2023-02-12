namespace Common.Versioning;

public class AppVersion
{
    internal AppVersion(string versionNumber, string buildDatetime)
    {
        VersionNumber = versionNumber;
        BuildDatetime = buildDatetime;
    }

    public string VersionNumber { get; }
    public string BuildDatetime { get; }

    public override string ToString()
    {
        return $"{VersionNumber} {BuildDatetime}";
    }
}
