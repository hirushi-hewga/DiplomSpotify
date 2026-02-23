using System.IdentityModel.Tokens.Jwt;
using SpotifyAPI.BLL.DTOs;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.BLL.Services.Jwt
{
    public interface IJwtService
    {
        string GenerateRefreshToken();
        Task<JwtSecurityToken> GenerateAccessTokenAsync(AppUser user);
        Task<JwtTokensDto?> GenerateTokensAsync(AppUser user);
        Task<ServiceResponse> RefreshTokensAsync(JwtTokensDto dto);
    }
}