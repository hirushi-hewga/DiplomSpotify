using System.ComponentModel.DataAnnotations;

namespace SpotifyAPI.DAL.Entities
{
    public class Playlist : BaseEntity<string>
    {
        public override string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Name { get; set; }
        public required string Title { get; set; }
        public bool IsBlackTitle { get; set; } = false;
        public string Image { get; set; } = string.Empty;
        
        [MaxLength(255)]
        public string? UserId { get; set; }
        public AppUser? User { get; set; }

        public List<PlaylistTrack> Tracks { get; set; } = [];
    }
}