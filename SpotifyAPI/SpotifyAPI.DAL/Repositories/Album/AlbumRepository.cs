using Microsoft.EntityFrameworkCore;

namespace SpotifyAPI.DAL.Repositories.Album;

public class AlbumRepository 
    : GenericRepository<Entities.Album, string>, IAlbumRepository
{
    private readonly AppDbContext _context;
    
    public AlbumRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }

    public IQueryable<Entities.Album> GetByUser(string userId)
    {
        return _context.Albums
            .AsNoTracking()
            .Where(a => a.AlbumLikes.Any(l => l.UserId == userId));
    }
}