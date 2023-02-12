using DataModel;
using Microsoft.AspNetCore.Http;

namespace DAL.LogicContexts.Audit.Services.AddAuditEvent;

public class AddAuditEventService : EFServiceBase, IAddAuditEventService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AddAuditEventService(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        : base(context)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public AuditEvent Add(AddAuditEvent e)
    {
        var dbEvent = new AuditEvent
        {
            DateTimeUtc = DateTime.UtcNow,
            Subject = e.Subject,
            Object = _httpContextAccessor.HttpContext.Request.Path,
            Description = e.Description,
        };

        Context.AuditEvents.Add(dbEvent);
        Context.SaveChanges();

        return dbEvent;
    }
}
