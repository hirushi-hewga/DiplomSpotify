using SpotifyAPI.BLL.DTOs.Account;
using SpotifyAPI.BLL.DTOs.User;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.BLL.Services.Account
{
    public interface IAccountService
    {
        Task<ServiceResponse> LoginAsync(LoginDto dto);
        Task<ServiceResponse> RegisterAsync(RegisterDto dto);
        Task<bool> EmailConfirmAsync(string id, string token);
        Task<bool> SendEmailConfirmAsync(string userId);
    }
}