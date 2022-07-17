namespace TodoApp.Api.Models;

public class TodoItem
{
    protected TodoItem()
    {
    }
    
    private TodoItem(string text, bool completed)
    {
        Text = text;
        Completed = completed;
    }
    
    public string Text { get; protected set; }
    public bool Completed { get; protected set; }

    public static TodoItem New(string text, bool completed)
    {
        return new TodoItem(text, completed);
    }
}