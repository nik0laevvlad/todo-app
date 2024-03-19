using System.Text;
using System.Text.Json.Serialization;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TodoApp.Api.DataAccess;
using TodoApp.Api.DataAccess.Identity;
using TodoApp.Api.DataAccess.Repositories;

namespace TodoApp.Api;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services
            .AddControllers()
            .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles)
            .Services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = _configuration["JwtAuth:Issuer"],
                    ValidAudience = _configuration["JwtAuth:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtAuth:Key"])),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true
                };
            }).Services.AddAuthorization()
            .AddSwaggerGen()
            .AddHttpContextAccessor()
            .AddHealthChecks();
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));
        services.AddMediatR(typeof(Program));
        services.AddTransient<ITokenService, TokenService>();
        services.AddScoped<IUnitOfWork, UnitOfWorkAdapter>();
        services
            .AddSingleton<IAuthPort, AuthAdapter>()
            .AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services
            .AddScoped<ITodoListRepository, TodoListRepositoryAdapter>()
            .AddScoped<IUserRepository, UserRepositoryAdapter>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsProduction())
        {
            app
                .UseDefaultFiles()
                .UseStaticFiles();
        }

        if (env.IsDevelopment())
        {
            app
                .UseDeveloperExceptionPage()
                .UseSwagger()
                .UseSwaggerUI();
        }

        app
            .UseHealthChecks("/health")
            .UseRouting()
            .UseAuthentication()
            .UseAuthorization()
            .UseEndpoints(endpoints =>
            {
                endpoints
                    .MapControllers();
            });
    }
}