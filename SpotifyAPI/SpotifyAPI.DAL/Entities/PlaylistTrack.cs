using System.ComponentModel.DataAnnotations;

namespace SpotifyAPI.DAL.Entities
{
    public class PlaylistTrack
    {
        [MaxLength(255)]
        public string? PlaylistId { get; set; }
        public Playlist? Playlist { get; set; }
        
        [MaxLength(255)]
        public string? TrackId { get; set; }
        public Track? Track { get; set; }
    }
}