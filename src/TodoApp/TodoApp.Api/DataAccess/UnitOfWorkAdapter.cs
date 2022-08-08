namespace TodoApp.Api.DataAccess;

public class UnitOfWorkAdapter : IUnitOfWork
{
    private readonly AppDbContext _dbContext;

    public UnitOfWorkAdapter(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task CommitAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}