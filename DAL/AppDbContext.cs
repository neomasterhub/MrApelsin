using DAL.Features.Audit;
using DataModel;
using Microsoft.EntityFrameworkCore;

namespace DAL;

public class AppDbContext : DbContext, IAuditContext
{
    public static readonly string Schema = "mr.apelsin";

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<AuditEvent> AuditEvents { get; set; }

    protected override void OnModelCreating(ModelBuilder builder) => builder
        .BuildAuditModels()
        .HasDefaultSchema(Schema);
}
