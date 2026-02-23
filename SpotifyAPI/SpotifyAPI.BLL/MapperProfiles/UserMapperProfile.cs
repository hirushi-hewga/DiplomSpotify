using AutoMapper;
using SpotifyAPI.BLL.DTOs.Account;
using SpotifyAPI.BLL.DTOs.User;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.BLL.MapperProfiles
{
    public class UserMapperProfile : Profile
    {
        public UserMapperProfile()
        {
            // RegisterDto -> AppUser
            CreateMap<RegisterDto, AppUser>();
            
            // AppUser -> UserDto
            CreateMap<AppUser, UserDto>()
                .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.UserRoles));

            // UserCreateDto -> AppUser
            CreateMap<UserCreateDto, AppUser>()
                .ForMember(dest => dest.Image, opt => opt.Ignore());

            // UserUpdateDto -> AppUser
            CreateMap<UserUpdateDto, AppUser>()
                .ForMember(dest => dest.Image, opt => opt.Ignore());
        }
    }
}