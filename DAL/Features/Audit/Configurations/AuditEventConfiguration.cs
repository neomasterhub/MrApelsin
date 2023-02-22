using DataModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Features.Audit.Configuration;

internal class AuditEventConfiguration : IEntityTypeConfiguration<AuditEvent>
{
    public void Configure(EntityTypeBuilder<AuditEvent> builder)
    {
        builder.ToTable(nameof(AuditEvent))
            .HasKey(e => e.Id);

        builder.Property(e => e.DateTimeUtc)
            .IsRequired();

        builder.Property(e => e.Url)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(e => e.Subject)
            .IsRequired(false)
            .HasMaxLength(200);

        builder.Property(e => e.Description)
            .IsRequired(false)
            .HasMaxLength(2000);
    }
}
