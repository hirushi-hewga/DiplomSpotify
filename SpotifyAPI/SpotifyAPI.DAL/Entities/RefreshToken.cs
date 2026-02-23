using System.ComponentModel.DataAnnotations;

namespace SpotifyAPI.DAL.Entities
{
    public class RefreshToken : BaseEntity<string>
    {
        public override string Id { get; set; } = Guid.NewGuid().ToString();
        [Required]
        [MaxLength(450)]
        public required string Token { get; set; }
        [Required]
        [MaxLength(255)]
        public required string AccessId { get; set; }
        public DateTime ExpiredTime { get; set; } = DateTime.UtcNow.AddDays(1);
        public bool IsUsed { get; set; } = false;

        public required string UserId { get; set; }
        public AppUser? User { get; set; }
    }
}