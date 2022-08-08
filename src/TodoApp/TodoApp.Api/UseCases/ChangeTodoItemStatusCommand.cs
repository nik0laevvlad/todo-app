using MediatR;
using TodoApp.Api.DataAccess;
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
        private readonly IUnitOfWork _unitOfWork;

        public Handler(ITodoItemRepository todoItemRepository, IUnitOfWork unitOfWork)
        {
            _todoItemRepository = todoItemRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(ChangeTodoItemStatusCommand command, CancellationToken cancellationToken)
        {
            var item = await _todoItemRepository.ByIdAsync(command.Id);
            item.ChangeStatus();

            await _unitOfWork.CommitAsync();
            return default;
        }
    }
}