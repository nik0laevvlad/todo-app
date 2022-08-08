using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess.Repositories;

public class TodoItemRepositoryAdapter : ITodoItemRepository
{
    private readonly AppDbContext _dbContext;

    public TodoItemRepositoryAdapter(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(TodoItem item)
    {
        await _dbContext.AddAsync(item);
    }

    public async Task<TodoItem> ByIdAsync(Guid id)
    {
        return await _dbContext.TodoItems.FindAsync(id) ?? throw new Exception("Not found");
    }

    public async Task DeleteAsync(Guid id)
    {
        var item = await ByIdAsync(id);
        _dbContext.TodoItems.Remove(item);
    }

    public async Task<TodoItem[]> GetAllAsync()
    {
        var queryable = _dbContext.TodoItems.AsQueryable();
        return await queryable.ToArrayAsync();
    }
}