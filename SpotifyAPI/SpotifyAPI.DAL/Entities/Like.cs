using System.ComponentModel.DataAnnotations;

namespace SpotifyAPI.DAL.Entities
{
    public class Like
    {
        [MaxLength(255)]
        public string? UserId { get; set; }
        public AppUser? User { get; set; }
        
        [MaxLength(255)]
        public string? TrackId { get; set; }
        public Track? Track { get; set; }
        
        public DateTime LikeDate { get; set; }
    }
}