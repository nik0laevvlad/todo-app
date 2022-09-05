using MediatR;
using TodoApp.Api.DataAccess;
using TodoApp.Api.DataAccess.Repositories;

namespace TodoApp.Api.UseCases.List.Item;

public class DeleteItemCommand : IRequest
{
    public DeleteItemCommand(Guid id, Guid listId)
    {
        Id = id;
        ListId = listId;
    }

    public Guid Id { get; }
    public Guid ListId { get; }

    internal class Handler : IRequestHandler<DeleteItemCommand>
    {
        private readonly ITodoListRepository _todoListRepository;
        private readonly IUnitOfWork _unitOfWork;

        public Handler(IUnitOfWork unitOfWork, ITodoListRepository todoListRepository)
        {
            _unitOfWork = unitOfWork;
            _todoListRepository = todoListRepository;
        }

        public async Task<Unit> Handle(DeleteItemCommand command, CancellationToken cancellationToken)
        {
            var list = await _todoListRepository.ByIdAsync(command.ListId);
            list.DeleteItem(command.Id);

            await _unitOfWork.CommitAsync();
            return Unit.Value;
        }
    }
}