using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.BLL.DTOs.User;
using SpotifyAPI.BLL.Services.User;

namespace SpotifyAPI.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize(Roles = "admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : AppController
    {
        private readonly IUserService _userService;
        private readonly IValidator<UserCreateDto> _userCreateValidator;
        private readonly IValidator<UserUpdateDto> _userUpdateValidator;

        public UserController(IUserService userService, 
            IValidator<UserCreateDto> userCreateValidator, 
            IValidator<UserUpdateDto> userUpdateValidator)
        {
            _userService = userService;
            _userCreateValidator = userCreateValidator;
            _userUpdateValidator = userUpdateValidator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] UserCreateDto dto)
        {
            var validResult = await _userCreateValidator.ValidateAsync(dto);
            if (!validResult.IsValid)
                return BadRequest(validResult);

            var response = await _userService.CreateAsync(dto);
            return CreateActionResult(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] UserUpdateDto dto)
        {
            var validResult = await _userUpdateValidator.ValidateAsync(dto);
            if (!validResult.IsValid)
                return BadRequest(validResult);
            
            var response = await _userService.UpdateAsync(dto);
            return CreateActionResult(response);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(string? id)
        {
            var isValidId = ValidateId(id, out var message);
            if (!isValidId)
                return BadRequest(message);
            
            var response = await _userService.DeleteAsync(id ?? "");
            return CreateActionResult(response);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAsync(string? id, string? userName, string? email)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var isValidId = ValidateId(id, out var message);
                if (!isValidId)
                    return BadRequest(message);
                
                var response = await _userService.GetByIdAsync(id);
                return CreateActionResult(response);
            }
            
            if (!string.IsNullOrEmpty(userName))
            {
                var response = await _userService.GetByUserNameAsync(userName);
                return CreateActionResult(response);
            }
            
            if (!string.IsNullOrEmpty(email))
            {
                var response = await _userService.GetByEmailAsync(email);
                return CreateActionResult(response);
            }
            else
            {
                var response = await _userService.GetAllAsync();
                return CreateActionResult(response);
            }
        }
    }
}