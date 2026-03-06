using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.DAL.Repositories.Track;

public interface ITrackRepository 
    : IGenericRepository<Entities.Track, string>
{
    IQueryable<RecentlyPlayed> RecentlyPlayed(string userId, int count);
    IQueryable<Entities.Track> GetByAlbum(string albumId);
    Task<bool> UpsertAsync(string userId, string trackId);
}