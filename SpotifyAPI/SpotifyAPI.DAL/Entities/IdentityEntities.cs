using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SpotifyAPI.DAL.Entities
{
    public class AppUser : IdentityUser
    {
        [MaxLength(255)]
        public string? FirstName { get; set; }
        [MaxLength(255)]
        public string? LastName { get; set; }
        [MaxLength(255)]
        public string? Image { get; set; }
        public DateOnly BirthDate { get; set; }
        
        public List<AlbumLike> AlbumLikes { get; set; } = [];
        public List<Like> Likes { get; set; } = [];
        public List<Playlist> Playlists { get; set; } = [];
        public List<Follower> Subscriptions { get; set; } = [];
        
        public virtual ICollection<AppUserClaim> Claims { get; set; } = [];
        public virtual ICollection<AppUserLogin> Logins { get; set; } = [];
        public virtual ICollection<AppUserToken> Tokens { get; set; } = [];
        public virtual ICollection<AppUserRole> UserRoles { get; set; } = [];
    }

    public class AppRole : IdentityRole
    {
        public virtual ICollection<AppUserRole> UserRoles { get; set; } = [];
        public virtual ICollection<AppRoleClaim> RoleClaims { get; set; } = [];
    }

    public class AppUserRole : IdentityUserRole<string>
    {
        public virtual AppUser User { get; set; } = null!;
        public virtual AppRole Role { get; set; } = null!;
    }

    public class AppUserClaim : IdentityUserClaim<string>
    {
        public virtual AppUser? User { get; set; }
    }

    public class AppUserLogin : IdentityUserLogin<string>
    {
        public virtual AppUser? User { get; set; }
    }

    public class AppRoleClaim : IdentityRoleClaim<string>
    {
        public virtual AppRole? Role { get; set; }
    }

    public class AppUserToken : IdentityUserToken<string>
    {
        public virtual AppUser? User { get; set; }
    }
}