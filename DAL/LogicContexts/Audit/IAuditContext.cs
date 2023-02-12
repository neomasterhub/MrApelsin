using DataModel;
using Microsoft.EntityFrameworkCore;

namespace DAL.LogicContexts.Audit;

internal interface IAuditContext
{
    public DbSet<AuditEvent> AuditEvents { get; set; }
}
