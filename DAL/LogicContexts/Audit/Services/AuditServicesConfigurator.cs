using DAL.LogicContexts.Audit.Services.AddAuditEvent;
using Microsoft.Extensions.DependencyInjection;

namespace DAL.LogicContexts.Audit.Services;

internal static class AuditServicesConfigurator
{
    public static IServiceCollection AddAuditServices(this IServiceCollection services) => services
        .AddScoped<IAddAuditEventService, AddAuditEventService>();
}
