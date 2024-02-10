using MediatR;
using TodoApp.Api.DataAccess;
using TodoApp.Api.DataAccess.Repositories;
using TodoApp.Api.Models;

namespace TodoApp.Api.UseCases.List;

public class CreateTodoListCommand : IRequest
{
    public CreateTodoListCommand(string name, Guid? ownerId)
    {
        Name = name;
        OwnerId = ownerId;
    }

    public string Name { get; }
    public Guid? OwnerId { get; }

    internal class Handler : IRequestHandler<CreateTodoListCommand>
    {
        private readonly ITodoListRepository _todoListRepository;
        private readonly IUnitOfWork _unitOfWork;

        public Handler(ITodoListRepository todoListRepository, IUnitOfWork unitOfWork)
        {
            _todoListRepository = todoListRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(CreateTodoListCommand command, CancellationToken cancellationToken)
        {
            var list = TodoList.New(command.Name, command.OwnerId);
            await _todoListRepository.AddAsync(list);

            await _unitOfWork.CommitAsync();
            return Unit.Value;
        }
    }
}