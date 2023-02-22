using DAL.Features.Audit.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DAL;

public static class DALServicesConfigurator
{
    public static IServiceCollection AddDALServices(this IServiceCollection services, string migrationsAssemblyName, string connectionString) => services
        .AddDbContext<AppDbContext>(options => options
            .UseSqlServer(connectionString, options => options
                .MigrationsAssembly(migrationsAssemblyName)
                .MigrationsHistoryTable(tableName: "__EFMigrationsHistory", schema: AppDbContext.Schema)))
        .AddAuditServices();
}
