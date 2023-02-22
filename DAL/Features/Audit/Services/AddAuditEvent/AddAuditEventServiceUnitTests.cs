using Autofac;
using Autofac.Extras.Moq;
using Common.Exstensions;
using DataModel;
using Microsoft.AspNetCore.Http;
using Xunit;

namespace DAL.Features.Audit.Services.AddAuditEvent;

public class AddAuditEventServiceUnitTests : IClassFixture<AppDbContextFixture>
{
    private readonly AppDbContext _context;
    private readonly AutoMock _mock;

    public AddAuditEventServiceUnitTests(AppDbContextFixture fixture)
    {
        _context = fixture.Context;
        _mock = AutoMock.GetLoose(builder =>
        {
            builder.RegisterInstance(_context);
            builder.RegisterType<AddAuditEventService>().As<IAddAuditEventService>();
        });
    }

    [Fact]
    public void ShouldBeResolved()
    {
        var actual = _mock.Create<IAddAuditEventService>();

        Assert.NotNull(actual);
        Assert.IsType<AddAuditEventService>(actual);
    }

    [Fact]
    public void ShouldAdd()
    {
        var expected = new
        {
            Url = "http://mr-apelsin.net/graphql?x=1&y=2",
            Subject = "Vasya",
            Description = "Lorem ipsum",
        };
        var arg = new AddAuditEvent
        {
            Subject = expected.Subject,
            Description = expected.Description,
        };
        var httpContext = new DefaultHttpContext();
        httpContext.Request.FromUrl(expected.Url);
        _mock.Mock<IHttpContextAccessor>()
            .Setup(accessor => accessor.HttpContext)
            .Returns(httpContext);
        var sut = _mock.Create<IAddAuditEventService>();

        var actual = sut.Add(arg);

        Assert.IsType<AuditEvent>(actual);
        Assert.NotNull(actual);
        Assert.NotEqual(0, actual.Id);
        Assert.True(_context.AuditEvents.Any(e => e.Id == actual.Id));
        Assert.Equal(expected.Url, actual.Url);
        Assert.Equal(expected.Subject, actual.Subject);
        Assert.Equal(expected.Description, actual.Description);
    }
}
