using DAL.Features.Audit.Configuration;
using Microsoft.EntityFrameworkCore;

namespace DAL.Features.Audit;

internal static class AuditModelsBuilder
{
    internal static ModelBuilder BuildAuditModels(this ModelBuilder modelBuilder) => modelBuilder
        .ApplyConfiguration(new AuditEventConfiguration());
}
