using System.Text.Json.Serialization;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TodoApp.Api.DataAccess;
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
            .AddHealthChecks();
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));
        services.AddMediatR(typeof(Program));

        services.AddScoped<IUnitOfWork, UnitOfWorkAdapter>();
        services
            .AddScoped<ITodoListRepository, TodoListRepositoryAdapter>();
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
            app.UseDeveloperExceptionPage();
        }

        app
            .UseHealthChecks("/health")
            .UseRouting()
            .UseEndpoints(endpoints =>
            {
                endpoints
                    .MapControllers();
            });
    }
}