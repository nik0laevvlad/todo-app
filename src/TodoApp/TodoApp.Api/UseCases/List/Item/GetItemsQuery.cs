using MediatR;
using TodoApp.Api.DataAccess.Repositories;
using TodoApp.Api.Models;

namespace TodoApp.Api.UseCases.List.Item;

public record GetItemsQuery(Guid ParentId) : IRequest<TodoItem[]>
{
    internal class Handler : IRequestHandler<GetItemsQuery, TodoItem[]>
    {
        private readonly ITodoListRepository _todoListRepository;

        public Handler(ITodoListRepository todoListRepository)
        {
            _todoListRepository = todoListRepository;
        }

        public async Task<TodoItem[]> Handle(GetItemsQuery query, CancellationToken cancellationToken)
        {
            var items = await _todoListRepository.GetAllItemsAsync(query.ParentId);
            return items;
        }
    }
}