namespace SpotifyAPI.BLL.Services.Album;

public interface IAlbumService
{
    Task<ServiceResponse> GetPagedAsync(string userId, int page, int pageSize);
    Task<ServiceResponse> GetLikedAsync(string userId);
    Task<ServiceResponse> GetRandomAsync(string userId, int count);
}