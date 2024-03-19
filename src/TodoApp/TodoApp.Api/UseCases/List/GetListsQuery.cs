using MediatR;
using TodoApp.Api.Controllers.Dto;
using TodoApp.Api.DataAccess.Repositories;

namespace TodoApp.Api.UseCases.List;

public record GetListsQuery(Guid? OwnerId) : IRequest<TodoListDto[]>
{
    internal class Handler : IRequestHandler<GetListsQuery, TodoListDto[]>
    {
        private readonly ITodoListRepository _listRepository;

        public Handler(ITodoListRepository listRepository)
        {
            _listRepository = listRepository;
        }

        public async Task<TodoListDto[]> Handle(GetListsQuery query, CancellationToken cancellationToken)
        {
            var items = await _listRepository.GetAllAsync(ownerId: query.OwnerId);
            return items.Select(x => new TodoListDto(x)).ToArray();
        }
    }
}