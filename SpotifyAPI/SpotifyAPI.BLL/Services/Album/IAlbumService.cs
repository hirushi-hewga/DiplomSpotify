namespace SpotifyAPI.BLL.Services.Album;

public interface IAlbumService
{
    Task<ServiceResponse> GetPagedAsync(int page, int pageSize);
    Task<ServiceResponse> GetLikedAsync(string userId);
}