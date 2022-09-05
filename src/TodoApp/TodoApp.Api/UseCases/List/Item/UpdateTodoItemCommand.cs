using MediatR;
using TodoApp.Api.DataAccess;
using TodoApp.Api.DataAccess.Repositories;

namespace TodoApp.Api.UseCases.List.Item;

public class UpdateTodoItemCommand : IRequest
{
    public UpdateTodoItemCommand(Guid id, string text, Guid listId)
    {
        Id = id;
        Text = text;
        ListId = listId;
    }

    public Guid Id { get; }
    public Guid ListId { get; }
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
            var list = await _todoListRepository.ByIdAsync(command.ListId);
            list.UpdateItem(command.Id, command.Text);

            await _unitOfWork.CommitAsync();
            return default;
        }
    }
}