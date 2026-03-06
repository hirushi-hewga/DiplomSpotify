using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.BLL.DTOs.Playlist;
using SpotifyAPI.BLL.Services.Playlist;

namespace SpotifyAPI.Controllers;

[ApiController]
[Route("api/playlist")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class PlaylistController : AppController
{
    private readonly IPlaylistService _service;

    public PlaylistController(IPlaylistService service)
    {
        _service = service;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetAll([FromQuery] string userId) 
        => CreateActionResult(await _service.GetAllAsync(userId));

    [HttpGet("user")]
    public async Task<IActionResult> GetByUser(
        [FromQuery] string userId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10
        )
        => CreateActionResult(await _service.GetPagedAsync(userId, page, pageSize));
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromQuery] string id)
        => CreateActionResult(await _service.GetByIdAsync(id));
    
    [HttpPost]
    public async Task<IActionResult> Create(PlaylistCreateDto dto)
        => CreateActionResult(await _service.CreateAsync(dto));
}