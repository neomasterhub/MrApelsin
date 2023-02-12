using DAL;
using DataModel;

namespace GraphQLTransport.Schema;

public class Mutation
{
    public AuditEvent AddAuditEvent(AppDbContext context, string description)
    {
        var e = new AuditEvent
        {
            DateTimeUtc = DateTime.UtcNow,
            Description = description,
        };

        context.AuditEvents.Add(e);
        context.SaveChanges();

        return e;
    }
}
