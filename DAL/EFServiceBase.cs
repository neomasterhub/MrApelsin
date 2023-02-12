namespace DAL;

public abstract class EFServiceBase
{
    protected readonly AppDbContext Context;

    public EFServiceBase(AppDbContext context)
    {
        Context = context;
    }
}
