using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess.Identity;

public class TokenService : ITokenService
{
    private const double EXPIRY_DURATION_HOURS = 3;

    public string BuildToken(string key, string issuer, string audience, UserEntity user)
    {
        var claims = new[] {
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.NameIdentifier,
                user.Id.ToString())
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
        var tokenDescriptor = new JwtSecurityToken(issuer, audience, claims,
            expires: DateTime.Now.AddHours(EXPIRY_DURATION_HOURS), signingCredentials: credentials);
        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }

    public bool IsTokenValid(string key, string issuer, string audience, string token)
    {
        var mySecret = Encoding.UTF8.GetBytes(key);
        var mySecurityKey = new SymmetricSecurityKey(mySecret);
        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            tokenHandler.ValidateToken(token,
                new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = mySecurityKey,
                }, out SecurityToken validatedToken);
        }
        catch
        {
            return false;
        }
        return true;
    }
}