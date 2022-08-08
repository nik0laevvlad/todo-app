using MediatR;
using TodoApp.Api.DataAccess;
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
        private readonly IUnitOfWork _unitOfWork;

        public Handler(ITodoItemRepository todoItemRepository, IUnitOfWork unitOfWork)
        {
            _todoItemRepository = todoItemRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(UpdateTodoItemCommand command, CancellationToken cancellationToken)
        {
            var item = await _todoItemRepository.ByIdAsync(command.Id);
            item.UpdateText(command.Text);

            await _unitOfWork.CommitAsync();
            return default;
        }
    }
}