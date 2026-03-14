
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.DAL;

namespace SpotifyAPI.BLL.Services.Like;

public class LikeService : ILikeService
{
    private readonly AppDbContext _context;

    public LikeService(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<ServiceResponse> LikeAsync(string userId, string trackId)
    {
        var exists = await _context.Likes
            .AnyAsync(l => l.UserId == userId && l.TrackId == trackId);

        if (exists)
            return new ServiceResponse("Track already liked");

        var like = new DAL.Entities.Like
        {
            UserId = userId,
            TrackId = trackId,
            LikeDate = DateTime.UtcNow
        };

        _context.Likes.Add(like);

        await _context.SaveChangesAsync();
        
        return new ServiceResponse("Track liked", true);
    }
}