using System.ComponentModel.DataAnnotations;

namespace SpotifyAPI.DAL.Entities
{
    public class Album : BaseEntity<string>
    {
        public override string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public string Image { get; set; }
        public DateOnly ReleaseDate { get; set; }
        
        [MaxLength(255)]
        public string? ArtistId { get; set; }
        public Artist? Artist { get; set; }

        public List<Track> Tracks { get; set; } = [];
    }
}