namespace TodoApp.Api.Models;

public class TodoItem
{
    protected TodoItem()
    {
    }

    private TodoItem(Guid id, Guid parentId, string text, bool completed)
    {
        Id = id;
        ParentId = parentId;
        Text = text;
        Completed = completed;
    }

    public Guid Id { get; protected set; }
    public Guid ParentId { get; protected set; }
    public string Text { get; protected set; } = null!;
    public bool Completed { get; protected set; }
    public TodoList List { get; protected set; }

    internal void UpdateText(string text)
    {
        Text = text;
    }

    internal void ChangeStatus()
    {
        Completed = !Completed;
    }

    public static TodoItem New(Guid parentId, string text)
    {
        return new TodoItem(Guid.NewGuid(), parentId, text, false);
    }
}