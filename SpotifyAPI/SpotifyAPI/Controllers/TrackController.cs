using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.BLL.DTOs.Track;
using SpotifyAPI.BLL.Services.Track;

namespace SpotifyAPI.Controllers;

[ApiController]
[Route("api/track")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class TrackController : AppController
{
    private readonly ITrackService _service;

    public TrackController(ITrackService service)
    {
        _service = service;
    }
    
    [HttpGet("paged")]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10
    )
        => CreateActionResult(await _service.GetPagedAsync(page, pageSize));
    
    [HttpGet("recently-played")]
    public async Task<IActionResult> RecentlyPlayed(
        [FromQuery] string userId,
        [FromQuery] int count = 9
    )
        => CreateActionResult(await _service.RecentlyPlayedAsync(userId, count));
    
    [HttpPost("recently-played")]
    public async Task<IActionResult> CreateRecentlyPlayed([FromBody] RecentlyPlayedCreateDto dto)
        => CreateActionResult(await _service.CreateRecentlyPlayedAsync(dto.UserId, dto.TrackId));
    
    [HttpGet("album")]
    public async Task<IActionResult> GetByAlbum(
        [FromQuery] string albumId
    )
        => CreateActionResult(await _service.GetByAlbumAsync(albumId));
}