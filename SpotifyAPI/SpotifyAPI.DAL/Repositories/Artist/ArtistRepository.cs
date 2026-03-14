using Microsoft.EntityFrameworkCore;

namespace SpotifyAPI.DAL.Repositories.Artist;

public class ArtistRepository 
    : GenericRepository<Entities.Artist, string>, IArtistRepository
{
    private readonly AppDbContext _context;
    
    public ArtistRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }

    public IQueryable<Entities.Artist> GetFavourite(string userId)
    {
        return _context.Artists
            .AsNoTracking()
            .Where(a => a.Followers.Any(f => f.UserId == userId));
    }

    public async Task<Entities.Artist?> GetByTrackAsync(string trackId)
    {
        var track = await _context.Tracks
            .AsNoTracking()
            .Include(t => t.Album)
            .ThenInclude(a => a.Artist)
            .FirstOrDefaultAsync(t => t.Id == trackId);
        
        if (track == null)
            return null;

        return track.Album?.Artist;
    }
}