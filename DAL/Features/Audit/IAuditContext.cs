using DataModel;
using Microsoft.EntityFrameworkCore;

namespace DAL.Features.Audit;

internal interface IAuditContext
{
    public DbSet<AuditEvent> AuditEvents { get; set; }
}
