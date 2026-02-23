using System.ComponentModel.DataAnnotations;

namespace SpotifyAPI.DAL.Entities
{
    public class TrackGenre
    {
        [MaxLength(255)]
        public string? TrackId { get; set; }
        public Track? Track { get; set; }
        
        [MaxLength(255)]
        public string? GenreId { get; set; }
        public Genre? Genre { get; set; }
    }
}