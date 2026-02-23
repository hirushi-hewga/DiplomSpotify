using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.DataInitializer;

namespace SpotifyAPI.Controllers;

[ApiController]
[Route("api/seed")]
public class SeedController : ControllerBase
{
    private readonly DeezerSeedService _seed;
    public SeedController(DeezerSeedService seed) => _seed = seed;

    [HttpPost("deezer-once")]
    public async Task<IActionResult> DeezerOnce(CancellationToken ct)
        => Ok(await _seed.SeedOnceAsync(ct));
}