using FluentValidation;
using Microsoft.AspNetCore.Http;
using SpotifyAPI.BLL.DTOs.Role;

namespace SpotifyAPI.BLL.DTOs.User
{
    public class UserDto
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public DateOnly BirthDate { get; set; }
        public IEnumerable<RoleDto> Roles { get; set; } = [];
    }
}