using MediatR;
using TodoApp.Api.DataAccess;
using TodoApp.Api.DataAccess.Identity;
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
        private readonly IAuthPort _authPort;

        public Handler(ITodoListRepository todoListRepository, IUnitOfWork unitOfWork, IAuthPort authPort)
        {
            _todoListRepository = todoListRepository;
            _unitOfWork = unitOfWork;
            _authPort = authPort;
        }

        public async Task<Unit> Handle(DeleteListCommand command, CancellationToken cancellationToken)
        {
            var list = await _todoListRepository.ByIdAsync(command.Id);
            if (list.OwnerId.HasValue && list.OwnerId != _authPort.Id)
            {
                throw new Exception("Access denied");
            }
            await _todoListRepository.DeleteAsync(list.Id);

            await _unitOfWork.CommitAsync();
            return Unit.Value;
        }
    }
}