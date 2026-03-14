namespace SpotifyAPI.DAL.Repositories.Album;

public interface IAlbumRepository 
    : IGenericRepository<Entities.Album, string>
{
    IQueryable<Entities.Album> GetByUser(string userId);
    IQueryable<Entities.Album> GetRandom(int count);
}