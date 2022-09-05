namespace TodoApp.Api.Models;

public class TodoItem
{
    protected TodoItem()
    {
    }

    private TodoItem(Guid id, Guid listId, string text, bool completed)
    {
        Id = id;
        ListId = listId;
        Text = text;
        Completed = completed;
    }

    public Guid Id { get; protected set; }
    public Guid ListId { get; protected set; }
    public string Text { get; protected set; } = null!;
    public bool Completed { get; protected set; }

    internal void UpdateText(string text)
    {
        Text = text;
    }

    internal void ChangeStatus()
    {
        Completed = !Completed;
    }

    public static TodoItem New(Guid listId, string text)
    {
        return new TodoItem(Guid.NewGuid(), listId, text, false);
    }
}