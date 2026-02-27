using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.BLL.DTOs;
using SpotifyAPI.BLL.DTOs.Artist;
using SpotifyAPI.BLL.Services.Artist;

namespace SpotifyAPI.Controllers;

[ApiController]
[Route("api/artist")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class ArtistController : AppController
{
    private readonly IArtistService _service;

    public ArtistController(IArtistService service)
    {
        _service = service;
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> Create([FromForm] ArtistCreateDto dto)
        => CreateActionResult(await _service.CreateAsync(dto));

    [HttpPut]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> Update([FromForm] ArtistUpdateDto dto)
        => CreateActionResult(await _service.UpdateAsync(dto));

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> Delete(string id)
        => CreateActionResult(await _service.DeleteAsync(id));
    
    [HttpGet("favourites")]
    public async Task<IActionResult> GetFavourite([FromQuery] string userId)
        => CreateActionResult(await _service.GetFavouriteAsync(userId));
    
    [HttpGet]
    public async Task<IActionResult> GetPage([FromQuery] PageQuery q)
        => CreateActionResult(await _service.GetPageAsync(q));

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
        => CreateActionResult(await _service.GetByIdAsync(id));
}