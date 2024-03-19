using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers.Dto;

public class TodoItemDto
{
    public TodoItemDto(TodoItem item)
    {
        Id = item.Id;
        ListId = item.ListId;
        Text = item.Text;
        Completed = item.Completed;
    }

    public Guid Id { get; }
    public Guid ListId { get; }
    public string Text { get; }
    public bool Completed { get; }
}