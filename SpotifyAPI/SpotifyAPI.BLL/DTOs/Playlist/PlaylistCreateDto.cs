using Microsoft.AspNetCore.Http;

namespace SpotifyAPI.BLL.DTOs.Playlist;

public class PlaylistCreateDto
{
    public string? Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public required string Title { get; set; }
    public required bool IsBlackTitle { get; set; }
    public IFormFile? Image { get; set; }
    public required string UserId { get; set; }
}