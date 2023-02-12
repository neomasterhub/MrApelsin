using GraphQLTransport;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("MSSQL");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();
builder.Services.AddGraphQLTransportServices(connectionString);
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseAuthorization();
app.MapControllers();
app.MapGraphQL();
app.Run();
