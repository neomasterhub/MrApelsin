using GraphQLTransport;
using WebApi.Configurators;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("MSSQL");

builder.Services.AddControllers();
builder.Services.AddCorsPolicy();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();
builder.Services.AddGraphQLTransportServices(nameof(WebApi), connectionString);
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseRouting();
app.UseWebSockets();
app.UseCors(CorsPolicyConfigurator.CorsPolicyName);
app.UseAuthorization();
app.MapControllers();
app.MapGraphQL();
app.Run();
