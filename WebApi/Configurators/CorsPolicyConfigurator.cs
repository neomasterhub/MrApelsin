namespace WebApi.Configurators;

public static class CorsPolicyConfigurator
{
    public static readonly string CorsPolicyName = "st cors";

    public static IServiceCollection AddCorsPolicy(this IServiceCollection services) => services
        .AddCors(options => options.AddPolicy(
            CorsPolicyName,
            builder => builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()));
}
