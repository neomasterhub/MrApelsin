using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;

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

    public static HttpRequest FromUrl(this HttpRequest request, string url)
    {
        UriHelper
            .FromAbsolute(
                url,
                out var scheme,
                out var host,
                out var path,
                out var query,
                fragment: out var _);

        request.Scheme = scheme;
        request.Host = host;
        request.Path = path;
        request.QueryString = query;

        return request;
    }
}
