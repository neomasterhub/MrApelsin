using Microsoft.AspNetCore.Http;

namespace Common.Exstensions;

public static class HttpExtensions
{
    public static string GetUrl(this HttpRequest request)
    {
        var url = string.Concat(
            request.Scheme,
            "://",
            request.Host,
            request.Path,
            request.QueryString.Value);

        return url;
    }
}
