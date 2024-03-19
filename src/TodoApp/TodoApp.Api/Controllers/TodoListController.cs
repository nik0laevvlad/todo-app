using MediatR;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Controllers.Dto;
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
    public async Task<TodoListDto[]> GetAllAsync([FromQuery] Guid? ownerId)
    {
        var query = new GetListsQuery(ownerId);
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