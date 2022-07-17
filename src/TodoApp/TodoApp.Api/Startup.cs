namespace TodoApp.Api;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services
            .AddControllers()
            .Services
            .AddHealthChecks();
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