namespace TodoApp.Api;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args)
    {
        return Host.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration(x => x.AddJsonFile("appsettings.Personal.json", optional: true))
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseWebRoot("ClientApp/build").UseStartup<Startup>();
            });
    }
}