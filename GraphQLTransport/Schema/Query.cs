using DAL;
using DataModel;

namespace GraphQLTransport.Schema;

public class Query
{
    public IQueryable<AuditEvent> GetAuditEvents(AppDbContext context) => context.AuditEvents;
}
