using System.ComponentModel.DataAnnotations;

namespace SpotifyAPI.DAL.Entities
{
    public class Track : BaseEntity<string>
    {
        public override string Id { get; set; } = Guid.NewGuid().ToString();
        public int Duration { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string Image { get; set; }
        
        [MaxLength(255)]
        public string? AlbumId { get; set; }
        public Album? Album { get; set; }
        
        public List<RecentlyPlayed> Recently { get; set; } = [];
        public List<PlaylistTrack> Playlists { get; set; } = [];
        public List<Like> Likes { get; set; } = [];
        public List<TrackGenre> Genres { get; set; } = [];
    }
}