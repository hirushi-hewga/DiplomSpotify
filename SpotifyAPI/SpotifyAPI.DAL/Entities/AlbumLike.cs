using System.ComponentModel.DataAnnotations;

namespace SpotifyAPI.DAL.Entities;

public class AlbumLike
{
    [MaxLength(255)]
    public string? UserId { get; set; }
    public AppUser? User { get; set; }
        
    [MaxLength(255)]
    public string? AlbumId { get; set; }
    public Album? Album { get; set; }
        
    public DateTime LikeDate { get; set; }
}