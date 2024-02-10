﻿using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess.Repositories;

public class TodoListRepositoryAdapter : ITodoListRepository
{
    private readonly AppDbContext _dbContext;

    public TodoListRepositoryAdapter(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(TodoList list)
    {
        await _dbContext.AddAsync(list);
    }

    public async Task AddItemAsync(TodoItem item)
    {
        await _dbContext.AddAsync(item);
    }

    public async Task<TodoList> ByIdAsync(Guid id)
    {
        return await _dbContext.TodoLists.FindAsync(id) ?? throw new Exception("List not found");
    }

    public async Task DeleteAsync(Guid id)
    {
        var list = await ByIdAsync(id);
        _dbContext.TodoLists.Remove(list);
    }

    public async Task<TodoList[]> GetAllAsync(Guid? ownerId = null)
    {
        var queryable = _dbContext.TodoLists.AsQueryable();

        if (ownerId.HasValue)
        {
            queryable = queryable.Where(x => x.OwnerId == ownerId.Value || x.OwnerId == null);
        }
        else
        {
            queryable = queryable.Where(x => x.OwnerId == null);
        }

        return await queryable.ToArrayAsync();
    }

    public async Task<TodoItem[]> GetAllItemsAsync(Guid listId)
    {
        var queryable = _dbContext.TodoItems.Where(x => x.ListId == listId);
        return await queryable.ToArrayAsync();
    }
}