using MediatR;
using TodoApp.Api.DataAccess.Repositories;

namespace TodoApp.Api.UseCases;

public class UpdateTodoItemCommand : IRequest
{
    public UpdateTodoItemCommand(Guid id, string text)
    {
        Id = id;
        Text = text;
    }

    public Guid Id { get; }
    public string Text { get; }

    internal class Handler : IRequestHandler<UpdateTodoItemCommand>
    {
        private readonly ITodoItemRepository _todoItemRepository;

        public Handler(ITodoItemRepository todoItemRepository)
        {
            _todoItemRepository = todoItemRepository;
        }

        public async Task<Unit> Handle(UpdateTodoItemCommand command, CancellationToken cancellationToken)
        {
            var item = await _todoItemRepository.ByIdAsync(command.Id);
            item.UpdateText(command.Text);
            await _todoItemRepository.UpdateAsync(item);

            return default;
        }
    }
}