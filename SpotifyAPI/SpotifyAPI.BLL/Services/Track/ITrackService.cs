using SpotifyAPI.BLL.DTOs.Track;

namespace SpotifyAPI.BLL.Services.Track;

public interface ITrackService
{
    Task<ServiceResponse> GetPagedAsync(int page, int pageSize);
    Task<ServiceResponse> RecentlyPlayedAsync(string userId, int count);
    Task<ServiceResponse> CreateRecentlyPlayedAsync(string userId, string trackId);
    Task<ServiceResponse> GetByAlbumAsync(string albumId);
}