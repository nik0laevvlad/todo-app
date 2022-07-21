using MediatR;
using TodoApp.Api.DataAccess.Repositories;
using TodoApp.Api.Models;

namespace TodoApp.Api.UseCases;

public class CreateTodoItemCommand : IRequest<Guid>
{
    public CreateTodoItemCommand(string text)
    {
        Text = text;
    }
    
    public string Text { get; }
    
    internal class Handler : IRequestHandler<CreateTodoItemCommand, Guid>
    {
        private readonly ITodoItemRepository _todoItemRepository;

        public Handler(ITodoItemRepository todoItemRepository)
        {
            _todoItemRepository = todoItemRepository;
        }

        public async Task<Guid> Handle(CreateTodoItemCommand command, CancellationToken cancellationToken)
        {
            var item = TodoItem.New(command.Text);
            await _todoItemRepository.AddAsync(item);
            return item.Id;
        }
    }
}