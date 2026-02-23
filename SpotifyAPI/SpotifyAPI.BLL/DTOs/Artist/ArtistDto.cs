using Microsoft.AspNetCore.Http;

namespace SpotifyAPI.BLL.DTOs.Artist;

public class ArtistDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public int AlbumsCount { get; set; } = 0;
    public int FollowersCount { get; set; } = 0;
}

public class ArtistCreateDto
{
    public string Name { get; set; } = "";
    public IFormFile? Image { get; set; }
}

public class ArtistUpdateDto
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public IFormFile? Image { get; set; }
}