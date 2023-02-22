using DAL.Features.Audit.Services.AddAuditEvent;
using DataModel;

namespace GraphQLTransport.Schema;

public class Mutation
{
    public AuditEvent AddAuditEvent(IAddAuditEventService service, AddAuditEvent e) => service.Add(e);
}
