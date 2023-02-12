using DataModel;

namespace DAL.LogicContexts.Audit.Services.AddAuditEvent;

public interface IAddAuditEventService
{
    AuditEvent Add(AddAuditEvent e);
}
