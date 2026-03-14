using Microsoft.EntityFrameworkCore;

namespace SpotifyAPI.DAL.Repositories.Playlist;

public class PlaylistRepository 
    : GenericRepository<Entities.Playlist, string>, IPlaylistRepository
{
    private readonly AppDbContext _context;
    
    public PlaylistRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Entities.Playlist?> GetByTitleAsync(string title, string userId)
    {
        return await _context.Playlists
            .AsNoTracking()
            .FirstOrDefaultAsync(p => 
                p.UserId == userId && 
                p.Title.ToUpper() == title.ToUpper());
    }

    public IQueryable<Entities.Playlist> GetByQuery(string query, int count)
    {
        
        var pattern = $"%{query}%";

        return _context.Playlists
            .AsNoTracking()
            .Where(p =>
                EF.Functions.Like(p.Name, pattern) ||
                EF.Functions.Like(p.User!.UserName!, pattern)
            )
            .Take(count);
    }

    public IQueryable<Entities.Playlist> GetByUser(string userId)
    {
        return _context.Playlists
            .AsNoTracking()
            .Where(p => p.UserId == userId);
    }
}