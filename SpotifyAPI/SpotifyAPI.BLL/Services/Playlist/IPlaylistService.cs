using SpotifyAPI.BLL.DTOs.Playlist;

namespace SpotifyAPI.BLL.Services.Playlist;

public interface IPlaylistService
{
    Task<ServiceResponse> GetAllAsync(string userId);
    Task<ServiceResponse> GetPagedAsync(string userId, int page, int pageSize);
    Task<ServiceResponse> GetByIdAsync(string id);
    Task<ServiceResponse> CreateAsync(PlaylistCreateDto dto);
}