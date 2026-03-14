using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.DAL.Repositories.Track;

public interface ITrackRepository 
    : IGenericRepository<Entities.Track, string>
{
    IQueryable<RecentlyPlayed> RecentlyPlayed(string userId, int count);
    IQueryable<Entities.Track> GetByAlbum(string albumId);
    IQueryable<Entities.Track?> GetLiked(string userId);
    IQueryable<Entities.Track?> GetByGenre(string genre);
    IQueryable<Entities.Track> GetByQuery(string query, int count);
    Task<bool> UpsertAsync(string userId, string trackId);
}