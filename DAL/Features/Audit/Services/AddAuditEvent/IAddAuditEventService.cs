using DataModel;

namespace DAL.Features.Audit.Services.AddAuditEvent;

public interface IAddAuditEventService
{
    AuditEvent Add(AddAuditEvent e);
}
