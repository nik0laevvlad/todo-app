using MediatR;
using TodoApp.Api.DataAccess;
using TodoApp.Api.DataAccess.Repositories;

namespace TodoApp.Api.UseCases.List.Item;

public class CreateTodoItemCommand : IRequest<Guid>
{
    public CreateTodoItemCommand(string text, Guid listId)
    {
        Text = text;
        ListId = listId;
    }

    public string Text { get; }
    public Guid ListId { get; }

    internal class Handler : IRequestHandler<CreateTodoItemCommand, Guid>
    {
        private readonly ITodoListRepository _todoListRepository;
        private readonly IUnitOfWork _unitOfWork;

        public Handler(IUnitOfWork unitOfWork, ITodoListRepository todoListRepository)
        {
            _unitOfWork = unitOfWork;
            _todoListRepository = todoListRepository;
        }

        public async Task<Guid> Handle(CreateTodoItemCommand command, CancellationToken cancellationToken)
        {
            var list = await _todoListRepository.ByIdAsync(command.ListId);
            var item = list.AddNewItem(command.Text);
            await _todoListRepository.AddItemAsync(item);

            await _unitOfWork.CommitAsync();
            return item.Id;
        }
    }
}