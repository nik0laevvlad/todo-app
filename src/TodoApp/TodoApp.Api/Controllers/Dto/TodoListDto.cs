using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers.Dto;

public class TodoListDto
{
    public TodoListDto(TodoList list)
    {
        Id = list.Id;
        Name = list.Name;
        OwnerId = list.OwnerId;
    }

    public Guid Id { get; }
    public string Name { get; }
    public Guid? OwnerId { get; }
}