using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DAL;

public static class DALServicesConfigurator
{
    public static IServiceCollection AddDALServices(this IServiceCollection services, string connectionString) => services
        .AddDbContext<AppDbContext>(options => options
            .UseSqlServer(connectionString, options => options
                .MigrationsAssembly("WebApi")
                .MigrationsHistoryTable(tableName: "__EFMigrationsHistory", schema: AppDbContext.Schema)));
}
