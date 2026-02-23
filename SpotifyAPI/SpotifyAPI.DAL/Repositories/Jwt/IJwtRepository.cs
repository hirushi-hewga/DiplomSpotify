using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.DAL.Repositories.Jwt
{
    public interface IJwtRepository
        : IGenericRepository<RefreshToken, string>
    {
        Task<RefreshToken?> GetByTokenAsync(string token);
    }
}