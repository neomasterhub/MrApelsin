using DataModel;

namespace DAL.LogicContexts.Audit.Services.AddAuditEvent;

public class AddAuditEventService : EFServiceBase, IAddAuditEventService
{
    public AddAuditEventService(AppDbContext context)
        : base(context)
    {
    }

    public AuditEvent Add(AddAuditEvent e)
    {
        var dbEvent = new AuditEvent
        {
            DateTimeUtc = DateTime.UtcNow,
            Subject = e.Subject,
            Object = e.Object,
            Description = e.Description,
        };

        Context.AuditEvents.Add(dbEvent);
        Context.SaveChanges();

        return dbEvent;
    }
}
