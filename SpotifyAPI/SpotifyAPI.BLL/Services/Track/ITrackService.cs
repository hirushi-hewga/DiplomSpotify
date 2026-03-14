using SpotifyAPI.BLL.DTOs.Track;

namespace SpotifyAPI.BLL.Services.Track;

public interface ITrackService
{
    Task<ServiceResponse> GetPagedAsync(string userId, int page, int pageSize);
    Task<ServiceResponse> RecentlyPlayedAsync(string userId, int count);
    Task<ServiceResponse> CreateRecentlyPlayedAsync(string userId, string trackId);
    Task<ServiceResponse> GetByAlbumAsync(string userId, string albumId);
    Task<ServiceResponse> GetLikedAsync(string userId, int page, int pageSize);
    Task<ServiceResponse> GetByQueryAsync(string userId, string query, int count);
    Task<ServiceResponse> GetByGenreAsync(string userId, string genre, int page, int pageSize);
}