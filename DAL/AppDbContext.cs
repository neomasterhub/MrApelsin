using DAL.Configurations;
using DataModel;
using Microsoft.EntityFrameworkCore;

namespace DAL;

public class AppDbContext : DbContext
{
    public static readonly string Schema = "mr.apelsin";

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<AuditEvent> AuditEvents { get; set; }

    protected override void OnModelCreating(ModelBuilder builder) => builder
        .ApplyConfiguration(new AuditEventConfiguration())
        .HasDefaultSchema(Schema);
}
