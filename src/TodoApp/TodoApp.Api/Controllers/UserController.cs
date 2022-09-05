using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Controllers.Dto;
using TodoApp.Api.DataAccess.Identity;
using TodoApp.Api.UseCases.Identity;

namespace TodoApp.Api.Controllers;

[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IUserRepository _userRepository;
    private readonly IAuthPort _authPort;

    public UserController(IMediator mediator, IUserRepository userRepository, IAuthPort authPort)
    {
        _mediator = mediator;
        _userRepository = userRepository;
        _authPort = authPort;
    }

    [HttpPost("register")]
    public async Task AddNewUserAsync([FromBody] CreateUserCommand command)
    {
        await _mediator.Send(command);
    }

    [HttpPost("login")]
    public async Task<string> Login([FromBody] LoginCommand command)
    {
        return await _mediator.Send(command);
    }

    [Authorize]
    [HttpGet("who")]
    public async Task<CurrentUserDto> Who()
    {
        var user = await _userRepository.ByIdAsync(_authPort.Id!.Value);
        return new CurrentUserDto(user);
    }

    [HttpGet("context")]
    public async Task<UserContextDto> GetContext()
    {
        return await Task.FromResult(new UserContextDto(_authPort.Id, _authPort.Authenticated));
    }
}