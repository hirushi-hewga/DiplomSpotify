using Microsoft.EntityFrameworkCore;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.DAL.Repositories.Track;

public class TrackRepository
    : GenericRepository<Entities.Track, string>, ITrackRepository
{
    private readonly AppDbContext _context;
    
    public TrackRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }

    public IQueryable<RecentlyPlayed> RecentlyPlayed(string userId, int count)
    {
        return _context.RecentlyPlayed
            .AsNoTracking()
            .Include(p => p.Track)
            .Where(p => p.UserId == userId)
            .OrderByDescending(p => p.PlayedAt)
            .Take(count);
    }

    public IQueryable<Entities.Track> GetByAlbum(string albumId)
    {
        return _context.Tracks
            .AsNoTracking()
            .Where(t => t.AlbumId == albumId);
    }

    public async Task<bool> UpsertAsync(string userId, string trackId)
    {
        var trackExists = await _context.Tracks.AnyAsync(t => t.Id == trackId);
        if (!trackExists) return false;

        var existing = await _context.RecentlyPlayed
            .FirstOrDefaultAsync(r => r.UserId == userId && r.TrackId == trackId);

        if (existing != null)
        {
            existing.PlayedAt = DateTime.UtcNow;
        }
        else
        {
            await _context.RecentlyPlayed.AddAsync(new RecentlyPlayed
            {
                UserId = userId,
                TrackId = trackId,
                PlayedAt = DateTime.UtcNow
            });
        }

        await _context.SaveChangesAsync();
        
        const int limit = 50;

        var toDelete = await _context.RecentlyPlayed
            .Where(r => r.UserId == userId)
            .OrderByDescending(r => r.PlayedAt)
            .Skip(limit)
            .ToListAsync();

        if (toDelete.Count > 0)
        {
            _context.RecentlyPlayed.RemoveRange(toDelete);
            await _context.SaveChangesAsync();
        }
        
        return true;
    }
}