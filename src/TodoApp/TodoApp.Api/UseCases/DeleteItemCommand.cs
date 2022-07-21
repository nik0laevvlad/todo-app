using MediatR;
using TodoApp.Api.DataAccess.Repositories;

namespace TodoApp.Api.UseCases;

public class DeleteItemCommand : IRequest
{
    public DeleteItemCommand(Guid id)
    {
        Id = id;
    }

    public Guid Id { get; }

    internal class Handler : IRequestHandler<DeleteItemCommand>
    {
        private readonly ITodoItemRepository _todoItemRepository;

        public Handler(ITodoItemRepository todoItemRepository)
        {
            _todoItemRepository = todoItemRepository;
        }

        public async Task<Unit> Handle(DeleteItemCommand command, CancellationToken cancellationToken)
        {
            var item = await _todoItemRepository.ByIdAsync(command.Id);
            await _todoItemRepository.DeleteAsync(item.Id);

            return Unit.Value;
        }
    }
}