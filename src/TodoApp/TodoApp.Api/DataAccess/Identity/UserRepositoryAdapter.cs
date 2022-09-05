using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess.Identity;

public class UserRepositoryAdapter : IUserRepository
{
    private readonly AppDbContext _dbContext;

    public UserRepositoryAdapter(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(UserEntity user)
    {
        await _dbContext.Users.AddAsync(user);
    }

    public async Task<UserEntity> ByIdAsync(Guid id)
    {
        return await _dbContext.Users.FindAsync(id) ?? throw new Exception("User not found");
    }

    public async Task<UserEntity?> GetValidUserOrDefault(string email)
    {
        var user = await _dbContext.Users.SingleOrDefaultAsync(x => x.Email == email);
        return user;
    }

    public async Task<bool> IsUserExists(string email)
    {
        return await _dbContext.Users.AnyAsync(user => user.Email == email);
    }
}