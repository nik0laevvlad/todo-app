using MediatR;
using TodoApp.Api.DataAccess.Repositories;
using TodoApp.Api.Models;

namespace TodoApp.Api.UseCases;

public record GetItemsQuery : IRequest<TodoItem[]>
{
    internal class Handler : IRequestHandler<GetItemsQuery, TodoItem[]>
    {
        private readonly ITodoItemRepository _todoItemRepository;

        public Handler(ITodoItemRepository todoItemRepository)
        {
            _todoItemRepository = todoItemRepository;
        }

        public async Task<TodoItem[]> Handle(GetItemsQuery request, CancellationToken cancellationToken)
        {
            var items = await _todoItemRepository.GetAllAsync();
            return items;
        }
    }
}