using MediatR;
using TodoApp.Api.DataAccess;
using TodoApp.Api.DataAccess.Repositories;

namespace TodoApp.Api.UseCases.List.Item;

public class UpdateTodoItemCommand : IRequest
{
    public UpdateTodoItemCommand(Guid id, string text, Guid parentId)
    {
        Id = id;
        Text = text;
        ParentId = parentId;
    }

    public Guid Id { get; }
    public Guid ParentId { get; }
    public string Text { get; }

    internal class Handler : IRequestHandler<UpdateTodoItemCommand>
    {
        private readonly ITodoListRepository _todoListRepository;
        private readonly IUnitOfWork _unitOfWork;

        public Handler(IUnitOfWork unitOfWork, ITodoListRepository todoListRepository)
        {
            _unitOfWork = unitOfWork;
            _todoListRepository = todoListRepository;
        }

        public async Task<Unit> Handle(UpdateTodoItemCommand command, CancellationToken cancellationToken)
        {
            var list = await _todoListRepository.ByIdAsync(command.ParentId);
            list.UpdateItem(command.Id, command.Text);

            await _unitOfWork.CommitAsync();
            return default;
        }
    }
}