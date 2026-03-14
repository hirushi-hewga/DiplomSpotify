namespace SpotifyAPI.DAL.Repositories.Artist;

public interface IArtistRepository 
    : IGenericRepository<Entities.Artist, string>
{
    IQueryable<Entities.Artist> GetFavourite(string userId);
    Task<Entities.Artist?> GetByTrackAsync(string trackId);
}