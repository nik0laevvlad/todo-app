using MediatR;
using TodoApp.Api.DataAccess;
using TodoApp.Api.DataAccess.Repositories;

namespace TodoApp.Api.UseCases.List;

public class DeleteListCommand : IRequest
{
    public DeleteListCommand(Guid id)
    {
        Id = id;
    }

    public Guid Id { get; }

    internal class Handler : IRequestHandler<DeleteListCommand>
    {
        private readonly ITodoListRepository _todoListRepository;
        private readonly IUnitOfWork _unitOfWork;

        public Handler(ITodoListRepository todoListRepository, IUnitOfWork unitOfWork)
        {
            _todoListRepository = todoListRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(DeleteListCommand command, CancellationToken cancellationToken)
        {
            var list = await _todoListRepository.ByIdAsync(command.Id);
            await _todoListRepository.DeleteAsync(list.Id);

            await _unitOfWork.CommitAsync();
            return Unit.Value;
        }
    }
}