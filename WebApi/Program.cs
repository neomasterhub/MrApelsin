using GraphQLTransport;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("MSSQL");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddGraphQLTransportServices(connectionString);

var app = builder.Build();
app.UseAuthorization();
app.MapControllers();
app.MapGraphQL();
app.Run();
