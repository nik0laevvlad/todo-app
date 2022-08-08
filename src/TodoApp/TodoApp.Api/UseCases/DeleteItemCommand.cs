using MediatR;
using TodoApp.Api.DataAccess;
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
        private readonly IUnitOfWork _unitOfWork;

        public Handler(ITodoItemRepository todoItemRepository, IUnitOfWork unitOfWork)
        {
            _todoItemRepository = todoItemRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(DeleteItemCommand command, CancellationToken cancellationToken)
        {
            var item = await _todoItemRepository.ByIdAsync(command.Id);
            await _todoItemRepository.DeleteAsync(item.Id);

            await _unitOfWork.CommitAsync();
            return Unit.Value;
        }
    }
}