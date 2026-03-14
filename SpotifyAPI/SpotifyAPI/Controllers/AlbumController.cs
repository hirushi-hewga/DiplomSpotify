using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.BLL.Services.Album;

namespace SpotifyAPI.Controllers;

[ApiController]
[Route("api/album")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class AlbumController : AppController
{
    private readonly IAlbumService _service;

    public AlbumController(IAlbumService service)
    {
        _service = service;
    }

    [HttpGet("paged")]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10
    )
    {
        var userId = User.FindFirstValue("id");
        
        return CreateActionResult(await _service.GetPagedAsync(userId, page, pageSize));
    }
        

    [HttpGet("liked")]
    public async Task<IActionResult> GetLike()
    {
        var userId = User.FindFirstValue("id");
        
        return CreateActionResult(await _service.GetLikedAsync(userId));
    }
        

    [HttpGet("random")]
    public async Task<IActionResult> GetRandom([FromQuery] int count = 20)
    {
        var userId = User.FindFirstValue("id");
        
        return CreateActionResult(await _service.GetRandomAsync(userId, count));
    }
}