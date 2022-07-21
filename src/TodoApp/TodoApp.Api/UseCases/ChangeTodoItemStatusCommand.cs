using MediatR;
using TodoApp.Api.DataAccess.Repositories;

namespace TodoApp.Api.UseCases;

public class ChangeTodoItemStatusCommand : IRequest
{
    public ChangeTodoItemStatusCommand(Guid id)
    {
        Id = id;
    }

    public Guid Id { get; }

    internal class Handler : IRequestHandler<ChangeTodoItemStatusCommand>
    {
        private readonly ITodoItemRepository _todoItemRepository;

        public Handler(ITodoItemRepository todoItemRepository)
        {
            _todoItemRepository = todoItemRepository;
        }

        public async Task<Unit> Handle(ChangeTodoItemStatusCommand command, CancellationToken cancellationToken)
        {
            var item = await _todoItemRepository.ByIdAsync(command.Id);
            item.ChangeStatus();
            await _todoItemRepository.UpdateAsync(item);

            return default;
        }
    }
}