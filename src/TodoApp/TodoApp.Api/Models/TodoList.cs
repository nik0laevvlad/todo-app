namespace TodoApp.Api.Models;

public class TodoList
{
    private readonly List<TodoItem> _todoItems = new();

    protected TodoList()
    {
    }

    private TodoList(Guid id, string name, Guid? ownerId)
    {
        Id = id;
        Name = name;
        OwnerId = ownerId;
    }

    public IReadOnlyCollection<TodoItem> TodoItems => _todoItems.AsReadOnly();

    public Guid Id { get; protected set; }
    public string Name { get; protected set; } = null!;
    public Guid? OwnerId { get; protected set; }

    public void SetName(string value)
    {
        Name = value;
    }

    public static TodoList New(string name, Guid? ownerId)
    {
        var list = new TodoList(Guid.NewGuid(), name, ownerId);
        return list;
    }

    public TodoItem AddNewItem(string text)
    {
        var item = TodoItem.New(Id, text);
        _todoItems.Add(item);
        return item;
    }

    public void ChangeItemStatus(Guid id)
    {
        var item = _todoItems.FirstOrDefault(x => x.Id == id) ?? throw new Exception("Not found");
        item.ChangeStatus();
    }

    public void UpdateItem(Guid id, string text)
    {
        var item = _todoItems.FirstOrDefault(x => x.Id == id) ?? throw new Exception("Not found");
        item.UpdateText(text);
    }

    public void DeleteItem(Guid id)
    {
        var item = _todoItems.FirstOrDefault(x => x.Id == id) ?? throw new Exception("Not found");
        _todoItems.Remove(item);
    }
}