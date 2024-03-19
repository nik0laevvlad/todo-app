using MediatR;
using TodoApp.Api.Controllers.Dto;
using TodoApp.Api.DataAccess.Repositories;

namespace TodoApp.Api.UseCases.List.Item;

public record GetItemsQuery(Guid ListId) : IRequest<TodoItemDto[]>
{
    internal class Handler : IRequestHandler<GetItemsQuery, TodoItemDto[]>
    {
        private readonly ITodoListRepository _todoListRepository;

        public Handler(ITodoListRepository todoListRepository)
        {
            _todoListRepository = todoListRepository;
        }

        public async Task<TodoItemDto[]> Handle(GetItemsQuery query, CancellationToken cancellationToken)
        {
            var items = await _todoListRepository.GetAllItemsAsync(query.ListId);
            return items.Select(x => new TodoItemDto(x)).ToArray();
        }
    }
}