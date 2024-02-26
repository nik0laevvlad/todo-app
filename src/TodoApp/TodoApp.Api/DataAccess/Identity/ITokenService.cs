using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess.Identity;

public interface ITokenService
{
    string BuildToken(string key, string issuer, UserEntity user);
    bool IsTokenValid(string key, string issuer, string token);
}