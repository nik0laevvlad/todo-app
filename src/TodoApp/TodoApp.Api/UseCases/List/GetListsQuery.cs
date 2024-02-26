using MediatR;
using TodoApp.Api.DataAccess.Repositories;
using TodoApp.Api.Models;

namespace TodoApp.Api.UseCases.List;

public record GetListsQuery(Guid? OwnerId) : IRequest<TodoList[]>
{
    internal class Handler : IRequestHandler<GetListsQuery, TodoList[]>
    {
        private readonly ITodoListRepository _listRepository;

        public Handler(ITodoListRepository listRepository)
        {
            _listRepository = listRepository;
        }

        public async Task<TodoList[]> Handle(GetListsQuery query, CancellationToken cancellationToken)
        {
            var items = await _listRepository.GetAllAsync(ownerId: query.OwnerId);
            return items;
        }
    }
}