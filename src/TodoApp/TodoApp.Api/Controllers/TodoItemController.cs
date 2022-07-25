using MediatR;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Models;
using TodoApp.Api.UseCases;

namespace TodoApp.Api.Controllers;

[Route("api/todo")]
public class TodoItemController : ControllerBase
{
    private readonly IMediator _mediator;

    public TodoItemController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<TodoItem[]> GetAllAsync()
    {
        var query = new GetItemsQuery();
        return await _mediator.Send(query);
    }

    [HttpPost]
    public async Task<Guid> AddTodoItem([FromBody] CreateTodoItemCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpPut]
    public async Task UpdateTodoItem([FromBody] UpdateTodoItemCommand command)
    {
        await _mediator.Send(command);
    }

    [HttpPut("{id:guid}/complete")]
    public async Task CompleteItem(Guid id)
    {
        await _mediator.Send(new ChangeTodoItemStatusCommand(id));
    }

    [HttpDelete("{id:guid}")]
    public async Task DeleteItem(Guid id)
    {
        await _mediator.Send(new DeleteItemCommand(id));
    }
}