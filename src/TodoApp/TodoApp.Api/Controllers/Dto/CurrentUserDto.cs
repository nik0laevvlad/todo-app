using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers.Dto;

public class CurrentUserDto
{
    public CurrentUserDto(UserEntity user)
    {
        Id = user.Id;
        Username = user.Username;
        Email = user.Email;
    }

    public Guid Id { get; }
    public string Username { get; }
    public string Email { get; }
}