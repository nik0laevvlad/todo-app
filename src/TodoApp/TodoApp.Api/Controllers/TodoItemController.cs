using MediatR;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Controllers.Dto;
using TodoApp.Api.UseCases.List.Item;

namespace TodoApp.Api.Controllers;

[Route("api/list/{listId:guid}/item")]
public class TodoItemController : ControllerBase
{
    private readonly IMediator _mediator;

    public TodoItemController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<TodoItemDto[]> GetAllAsync(Guid listId)
    {
        var query = new GetItemsQuery(ListId: listId);
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
    public async Task CompleteItem(Guid id, Guid listId)
    {
        await _mediator.Send(new ChangeTodoItemStatusCommand(id, listId));
    }

    [HttpDelete("{id:guid}")]
    public async Task DeleteItem(Guid id, Guid listId)
    {
        await _mediator.Send(new DeleteItemCommand(id, listId));
    }
}