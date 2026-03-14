namespace SpotifyAPI.BLL.DTOs.Playlist;

public class PlaylistDto
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required bool IsBlackTitle { get; set; }
    public required string Name { get; set; }
    public string? Image { get; set; } = string.Empty;
}