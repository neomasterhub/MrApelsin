using DAL;
using DAL.Features.Audit.Services.AddAuditEvent;
using GraphQLTransport.Schema;
using Microsoft.Extensions.DependencyInjection;

namespace GraphQLTransport;

public static class GraphQLTransportServicesConfigurator
{
    public static IServiceCollection AddGraphQLTransportServices(
        this IServiceCollection services,
        string migrationsAssemblyName,
        string connectionString)
    {
        services.AddDALServices(migrationsAssemblyName, connectionString);

        services
            .AddGraphQLServer()
            .AddInMemorySubscriptions()
            .AddSorting()
            .RegisterDbContext<AppDbContext>()
            .RegisterService<IAddAuditEventService>()
            .AddQueryType<Query>()
            .AddMutationType<Mutation>()
            .AddSubscriptionType<Subscription>();

        return services;
    }
}
