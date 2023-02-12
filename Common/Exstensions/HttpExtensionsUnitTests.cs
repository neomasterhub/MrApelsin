using Microsoft.AspNetCore.Http;
using Xunit;

namespace Common.Exstensions;

public class HttpExtensionsUnitTests
{
    [Fact]
    public void ShouldBeSetFromUrl()
    {
        var httpContext = new DefaultHttpContext();
        var expected = new
        {
            Scheme = "http",
            Host = "mr-apelsin.net",
            Path = "/graphql",
            QueryString = "?x=1&y=2",
        };
        var url = $"{expected.Scheme}://{expected.Host}{expected.Path}{expected.QueryString}";

        var request = httpContext.Request.FromUrl(url);

        Assert.Same(httpContext.Request, request);
        Assert.Equal(expected.Scheme, request.Scheme);
        Assert.Equal(expected.Host, request.Host.ToString());
        Assert.Equal(expected.Path, request.Path);
        Assert.Equal(expected.QueryString, request.QueryString.Value);
    }

    [Fact]
    public void ShouldGetUrl()
    {
        var expected = "http://mr-apelsin.net/graphql?x=1&y=2";
        var httpContext = new DefaultHttpContext();
        httpContext.Request.FromUrl(expected);

        var actual = httpContext.Request.GetUrl();

        Assert.Equal(expected, actual);
    }
}
