namespace SpotifyAPI.BLL.DTOs.Track;

public class RecentlyPlayedCreateDto
{
    public required string UserId { get; set; }
    public required string TrackId { get; set; }
}