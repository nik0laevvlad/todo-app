using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess.Repositories;

public interface ITodoItemRepository
{
    Task AddAsync(TodoItem item);
    Task UpdateAsync(TodoItem item);
    Task<TodoItem> ByIdAsync(Guid id);
    Task DeleteAsync(Guid id);
    Task<TodoItem[]> GetAllAsync();
}