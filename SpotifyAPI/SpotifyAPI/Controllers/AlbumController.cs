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
        => CreateActionResult(await _service.GetPagedAsync(page, pageSize));
    
    [HttpGet("liked")]
    public async Task<IActionResult> GetLike([FromQuery] string userId)
        => CreateActionResult(await _service.GetLikedAsync(userId));
}