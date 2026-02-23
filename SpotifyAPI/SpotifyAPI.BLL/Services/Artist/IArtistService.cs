using SpotifyAPI.BLL.DTOs;
using SpotifyAPI.BLL.DTOs.Artist;

namespace SpotifyAPI.BLL.Services.Artist;

public interface IArtistService
{
    Task<ServiceResponse> CreateAsync(ArtistCreateDto dto);
    Task<ServiceResponse> GetByIdAsync(string id);
    Task<ServiceResponse> UpdateAsync(ArtistUpdateDto dto);
    Task<ServiceResponse> DeleteAsync(string id);
    Task<ServiceResponse> GetPageAsync(PageQuery q);
    Task<ServiceResponse> GetFavouriteAsync(string userId);
}