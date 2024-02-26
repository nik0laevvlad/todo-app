using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess.Identity;

public interface IUserRepository
{
    Task AddAsync(UserEntity user);
    Task<UserEntity> ByIdAsync(Guid id);
    Task<UserEntity?> GetValidUserOrDefault(string email);
    Task<bool> IsUserExists(string email);
}