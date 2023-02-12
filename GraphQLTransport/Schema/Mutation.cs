using DAL;
using DAL.LogicContexts.Audit.Services.AddAuditEvent;
using DataModel;

namespace GraphQLTransport.Schema;

public class Mutation
{
    public AuditEvent AddAuditEvent(AppDbContext context, IAddAuditEventService service, AddAuditEvent e) => service.Add(e);
}
