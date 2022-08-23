using MediatR;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Models;
using TodoApp.Api.UseCases.List;

namespace TodoApp.Api.Controllers;

[Route("api/list")]
public class TodoListController : ControllerBase
{
    private readonly IMediator _mediator;

    public TodoListController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<TodoList[]> GetAllAsync()
    {
        var query = new GetListsQuery();
        return await _mediator.Send(query);
    }

    [HttpPost]
    public async Task AddListAsync([FromBody] CreateTodoListCommand command)
    {
        await _mediator.Send(command);
    }

    [HttpDelete("{id:guid}")]
    public async Task DeleteAsync(Guid id)
    {
        await _mediator.Send(new DeleteListCommand(id));
    }
}