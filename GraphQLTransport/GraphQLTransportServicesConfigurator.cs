using DAL;
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
            .AddQueryType<Query>();

        return services;
    }
}
