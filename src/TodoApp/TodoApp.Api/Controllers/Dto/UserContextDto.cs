namespace TodoApp.Api.Controllers.Dto;

public class UserContextDto
{
    public UserContextDto(Guid? id, bool isAuthenticated)
    {
        Id = id;
        IsAuthenticated = isAuthenticated;
    }

    public Guid? Id { get; }
    public bool IsAuthenticated { get; }
}