using Xunit;

namespace DAL;

public class AppDbContextUnitTests : IClassFixture<AppDbContextFixture>
{
    private readonly AppDbContext _context;

    public AppDbContextUnitTests(AppDbContextFixture fixture)
    {
        _context = fixture.Context;
    }
}
