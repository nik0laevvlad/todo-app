namespace TodoApp.Api.DataAccess;

public interface IUnitOfWork
{
    Task CommitAsync();
}