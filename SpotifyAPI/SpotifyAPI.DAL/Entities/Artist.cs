using System.ComponentModel.DataAnnotations;

namespace SpotifyAPI.DAL.Entities
{
    public class Artist : BaseEntity<string>
    {
        public override string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public string Image { get; set; }

        public List<Album> Albums { get; set; } = [];
        public List<Follower> Followers { get; set; } = [];
    }
}