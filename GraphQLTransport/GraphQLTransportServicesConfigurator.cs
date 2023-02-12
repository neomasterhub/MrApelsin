using DAL;
using DAL.LogicContexts.Audit.Services.AddAuditEvent;
using GraphQLTransport.Schema;
using Microsoft.Extensions.DependencyInjection;

namespace GraphQLTransport;

public static class GraphQLTransportServicesConfigurator
{
    public static IServiceCollection AddGraphQLTransportServices(this IServiceCollection services, string connectionString)
    {
        services.AddDALServices(connectionString);

        services
            .AddGraphQLServer()
            .RegisterDbContext<AppDbContext>()
            .RegisterService<IAddAuditEventService>()
            .AddQueryType<Query>()
            .AddMutationType<Mutation>();

        return services;
    }
}
