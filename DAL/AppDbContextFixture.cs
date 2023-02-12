using Microsoft.EntityFrameworkCore;

namespace DAL;

public class AppDbContextFixture : IDisposable
{
    public readonly AppDbContext Context;

    public AppDbContextFixture()
    {
        var builder = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString());

        Context = new AppDbContext(builder.Options);
    }

    public void Dispose()
    {
        Context.Dispose();
    }
}
