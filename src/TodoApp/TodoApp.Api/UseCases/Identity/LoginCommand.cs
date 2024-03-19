using System.ComponentModel.DataAnnotations;
using MediatR;
using TodoApp.Api.DataAccess.Identity;

namespace TodoApp.Api.UseCases.Identity;

public class LoginCommand : IRequest<string>
{
    public LoginCommand(string email, string password)
    {
        Email = email;
        Password = password;
    }

    [Required]
    public string Email { get; }

    [Required]
    public string Password { get; }

    internal class Handler : IRequestHandler<LoginCommand, string>
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _configuration;

        public Handler(IUserRepository userRepository, ITokenService tokenService, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _configuration = configuration;
        }

        public async Task<string> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            var validUser = await _userRepository.GetValidUserOrDefault(command.Email);

            if (validUser == null)
                throw new Exception("User not found");

            if (!BCrypt.Net.BCrypt.Verify(command.Password, validUser.Password))
            {
                throw new Exception("Incorrect password");
            }

            var generatedToken = _tokenService.BuildToken(_configuration["JwtAuth:Key"],
                _configuration["JwtAuth:Issuer"], _configuration["JwtAuth:Audience"], validUser);

            if (!_tokenService.IsTokenValid(_configuration["JwtAuth:Key"], _configuration["JwtAuth:Issuer"],
                    _configuration["JwtAuth:Audience"], generatedToken))
            {
                throw new Exception("Access denied");
            }

            return generatedToken;
        }
    }
}