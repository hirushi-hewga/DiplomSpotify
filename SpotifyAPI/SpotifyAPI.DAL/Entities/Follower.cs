using System.ComponentModel.DataAnnotations;

namespace SpotifyAPI.DAL.Entities
{
    public class Follower
    {
        [MaxLength(255)]
        public string? UserId { get; set; }
        public AppUser? User { get; set; }
        
        [MaxLength(255)]
        public string? ArtistId { get; set; }
        public Artist? Artist { get; set; }
    }
}