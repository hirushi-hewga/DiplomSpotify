using SpotifyAPI.BLL.DTOs.Track;

namespace SpotifyAPI.BLL.DTOs.Album;

public class AlbumDto
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Image { get; set; }
    public string? Artist { get; set; }
    public int? TracksCount { get; set; }
    public List<TrackDto>? Tracks { get; set; }
}