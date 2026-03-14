namespace SpotifyAPI.DAL.Entities;

public class RecentlyPlayed : BaseEntity<string>
{ 
    public override string Id { get; set; } = Guid.NewGuid().ToString(); 
    public string UserId { get; set; } 
    public DateTime PlayedAt { get; set; } = DateTime.UtcNow; 
    
    public string? TrackId { get; set; } 
    public Track? Track { get; set; }
}