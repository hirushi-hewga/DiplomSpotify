using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.BLL.Services.Like;

namespace SpotifyAPI.Controllers;

[ApiController]
[Route("api/like")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class LikeController : AppController
{
    private readonly ILikeService _likeService;

    public LikeController(ILikeService likeService)
    {
        _likeService = likeService;
    }

    [HttpPost]
    public async Task<IActionResult> Like(
        [FromQuery] string trackId
    )
    {
        var userId = User.FindFirstValue("id");
        
        return CreateActionResult(await _likeService.LikeAsync(userId, trackId));
    }
}