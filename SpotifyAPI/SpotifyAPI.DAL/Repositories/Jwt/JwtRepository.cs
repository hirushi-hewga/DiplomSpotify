using Microsoft.EntityFrameworkCore;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.DAL.Repositories.Jwt
{
    public class JwtRepository
        : GenericRepository<RefreshToken, string>, IJwtRepository
    {
        private readonly AppDbContext _context;
        public JwtRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<RefreshToken?> GetByTokenAsync(string token)
        {
            return await _context.RefreshTokens
                .FirstOrDefaultAsync(t => t.Token == token);
        }
    }
}