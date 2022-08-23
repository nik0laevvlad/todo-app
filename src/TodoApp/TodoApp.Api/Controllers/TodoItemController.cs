using MediatR;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Models;
using TodoApp.Api.UseCases.List.Item;

namespace TodoApp.Api.Controllers;

[Route("api/list/{parentId:guid}/item")]
public class TodoItemController : ControllerBase
{
    private readonly IMediator _mediator;

    public TodoItemController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<TodoItem[]> GetAllAsync(Guid parentId)
    {
        var query = new GetItemsQuery(ParentId: parentId);
        return await _mediator.Send(query);
    }

    [HttpPost]
    public async Task<Guid> AddTodoItem([FromBody] CreateTodoItemCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpPut("{id:guid}")]
    public async Task UpdateTodoItem([FromBody] UpdateTodoItemCommand command)
    {
        await _mediator.Send(command);
    }

    [HttpPut("{id:guid}/complete")]
    public async Task CompleteItem(Guid id, Guid parentId)
    {
        await _mediator.Send(new ChangeTodoItemStatusCommand(id, parentId));
    }

    [HttpDelete("{id:guid}")]
    public async Task DeleteItem(Guid id, Guid parentId)
    {
        await _mediator.Send(new DeleteItemCommand(id, parentId));
    }
}