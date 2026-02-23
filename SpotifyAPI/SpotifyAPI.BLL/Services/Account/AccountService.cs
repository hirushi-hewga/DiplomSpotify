using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.BLL.DTOs.Account;
using SpotifyAPI.BLL.DTOs.User;
using SpotifyAPI.BLL.Services.Email;
using SpotifyAPI.BLL.Services.Jwt;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.BLL.Services.Account
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailService _emailService;
        private readonly IJwtService _jwtService;
        private readonly IMapper _mapper;

        public AccountService(UserManager<AppUser> userManager, IJwtService jwtService, IEmailService emailService, IMapper mapper)
        {
            _userManager = userManager;
            _emailService = emailService;
            _jwtService = jwtService;
            _mapper = mapper;
        }
        
        public async Task<ServiceResponse> LoginAsync(LoginDto dto)
        {
            var email = dto.Email.Trim();

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return new ServiceResponse($"Користувача з поштою '{email}' не знайдено");

            var ok = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!ok)
                return new ServiceResponse("Пароль вказано невірно");

            var tokens = await _jwtService.GenerateTokensAsync(user);
            if (tokens == null)
                return new ServiceResponse("Помилка при генерації токенів");

            return new ServiceResponse("Успішний вхід", true, tokens);
        }

        public async Task<ServiceResponse> RegisterAsync(RegisterDto dto)
        {
            if (await _userManager.FindByEmailAsync(dto.Email) != null)
                return new ServiceResponse($"Пошта '{dto.Email}' вже використовується");

            if (await _userManager.FindByNameAsync(dto.UserName) != null)
                return new ServiceResponse($"Ім'я користувача '{dto.UserName}' вже використовується");

            var user = _mapper.Map<AppUser>(dto);

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                return new ServiceResponse(string.Join("; ", result.Errors.Select(e => e.Description)));

            result = await _userManager.AddToRoleAsync(user, "user");
            if (!result.Succeeded)
                return new ServiceResponse(string.Join("; ", result.Errors.Select(e => e.Description)));

            return new ServiceResponse("Успішна реєстрація", true);
        }

        public async Task<bool> EmailConfirmAsync(string id, string token)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return false;

            var decodedToken = Uri.UnescapeDataString(token);

            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);
            return result.Succeeded;
        }

        public async Task<bool> SendEmailConfirmAsync(string userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                    return false;

                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var encodedToken = Uri.EscapeDataString(token);
                string messageBody = $@"
                    Please reset your password by clicking here: 
                    <a href='http://localhost:5014/api/account/emailConfirm?id={user.Id}&t={encodedToken}'>
                        Підтвердити пошту
                    </a>";

                var message = new Message()
                {
                    To = user.Email,
                    Name = user.UserName,
                    Body = messageBody
                };

                await _emailService.SendAsync(message);
            
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}