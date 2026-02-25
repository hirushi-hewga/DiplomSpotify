using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.BLL;
using SpotifyAPI.BLL.Services.Image;
using SpotifyAPI.DataInitializer;

namespace SpotifyAPI.Controllers;

[ApiController]
[Route("api/seed")]
public class SeedController : ControllerBase
{
    private readonly JamendoSeedService _seed;
    public SeedController(JamendoSeedService seed) => _seed = seed;

    [HttpPost("jamendo")]
    public async Task<IActionResult> JamendoGuaranteed(CancellationToken ct)
        => Ok(await _seed.SeedGuaranteedAsync(targetTracks: 3000, maxAlbumsPerArtist: 3, maxTracksPerAlbum: 20, ct: ct));

    [HttpGet("files-test")]
    public async Task<IActionResult> FilesTest([FromServices] IFileService files, CancellationToken ct)
    {
        var img = await files.SaveImageFromUrlAsync(
            "https://images.jamendo.com/albums/s0/33/covers/1.200.jpg",
            Settings.AlbumsPath,
            ct);

        var mp3 = await files.SaveAudioFromUrlAsync(
            "https://prod-1.storage.jamendo.com/download/track/241/mp32/",
            ct);

        return Ok(new { img, mp3 });
    }
}