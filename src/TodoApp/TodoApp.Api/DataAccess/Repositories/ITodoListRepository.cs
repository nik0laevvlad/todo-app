using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess.Repositories;

public interface ITodoListRepository
{
    Task AddAsync(TodoList list);
    Task AddItemAsync(TodoItem item);
    Task<TodoList> ByIdAsync(Guid id);
    Task DeleteAsync(Guid id);
    Task<TodoList[]> GetAllAsync(Guid? ownerId = null);
    Task<TodoItem[]> GetAllItemsAsync(Guid listId);
}