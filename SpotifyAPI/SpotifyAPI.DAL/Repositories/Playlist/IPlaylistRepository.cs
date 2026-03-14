namespace SpotifyAPI.DAL.Repositories.Playlist;

public interface IPlaylistRepository 
    : IGenericRepository<Entities.Playlist, string>
{
    Task<Entities.Playlist?> GetByTitleAsync(string title, string userId);
    IQueryable<Entities.Playlist> GetByQuery(string query, int count);
    IQueryable<Entities.Playlist> GetByUser(string userId);
}