using DAL.LogicContexts.Audit.Configuration;
using Microsoft.EntityFrameworkCore;

namespace DAL.LogicContexts.Audit;

internal static class AuditModelsBuilder
{
    internal static ModelBuilder BuildAuditModels(this ModelBuilder modelBuilder) => modelBuilder
        .ApplyConfiguration(new AuditEventConfiguration());
}
