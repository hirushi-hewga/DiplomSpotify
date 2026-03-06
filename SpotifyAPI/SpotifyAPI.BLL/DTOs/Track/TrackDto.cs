namespace SpotifyAPI.BLL.DTOs.Track;

public class TrackDto
{
    public required string Id { get; set; }
    public required int Duration { get; set; }
    public required string Name { get; set; }
    public required string Path { get; set; }
    public string? Image { get; set; } = string.Empty;
    public string? Artist { get; set; } = string.Empty;
}