using System.ComponentModel.DataAnnotations;
using MediatR;
using TodoApp.Api.DataAccess;
using TodoApp.Api.DataAccess.Identity;
using TodoApp.Api.Models;

namespace TodoApp.Api.UseCases.Identity;

public class CreateUserCommand : IRequest
{
    public CreateUserCommand(string username, string email, string password)
    {
        Username = username;
        Email = email;
        Password = password;
    }

    [Required]
    public string Username { get; }

    [Required]
    public string Email { get; }

    [Required]
    public string Password { get; }

    internal class Handler : IRequestHandler<CreateUserCommand>
    {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;

        public Handler(IUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(CreateUserCommand command, CancellationToken cancellationToken)
        {
            if (await _userRepository.IsUserExists(command.Email))
                throw new Exception("User with this email already exists");

            var user = UserEntity.New(command.Username, command.Email,
                BCrypt.Net.BCrypt.HashPassword(command.Password));

            await _userRepository.AddAsync(user);
            await _unitOfWork.CommitAsync();
            return Unit.Value;
        }
    }
}