using System.Security.Claims;

namespace TodoApp.Api.DataAccess.Identity;

public interface IAuthPort
{
    Guid? Id { get; }
    bool Authenticated { get; }
}

public class AuthAdapter : IAuthPort
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthAdapter(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid? Id => FindId(ClaimTypes.NameIdentifier);

    public bool Authenticated => _httpContextAccessor.HttpContext!.User.Identity?.IsAuthenticated == true;

    private Guid? FindId(string claimName)
    {
        var value = _httpContextAccessor.HttpContext!.User.FindFirstValue(claimName);
        return value != null ? Guid.Parse(value) : null;
    }
}