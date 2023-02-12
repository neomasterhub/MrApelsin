using Autofac;
using Autofac.Extras.Moq;
using Xunit;

namespace DAL.LogicContexts.Audit.Services.AddAuditEvent;

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
}
