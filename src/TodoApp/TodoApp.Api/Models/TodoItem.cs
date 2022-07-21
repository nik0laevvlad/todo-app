namespace TodoApp.Api.Models;

public class TodoItem
{
    protected TodoItem()
    {
    }

    private TodoItem(Guid id, string text, bool completed)
    {
        Id = id;
        Text = text;
        Completed = completed;
    }

    public Guid Id { get; protected set; }
    public string Text { get; protected set; }
    public bool Completed { get; protected set; }

    internal void UpdateText(string text)
    {
        Text = text;
    }

    internal void ChangeStatus()
    {
        Completed = !Completed;
    }

    public static TodoItem New(string text)
    {
        return new TodoItem(Guid.NewGuid(), text, false);
    }
}