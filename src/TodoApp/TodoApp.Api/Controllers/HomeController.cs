using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers;

[Route("api/home")]
public class HomeController : ControllerBase
{
    [HttpGet("main")]
    public TodoItem GetData()
    {
        var item = TodoItem.New("testText", false);
        return item;
    }
}