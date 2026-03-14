using AutoMapper;
using SpotifyAPI.BLL.DTOs.Artist;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.BLL.MapperProfiles;

public class ArtistMapperProfile : Profile
{
    public ArtistMapperProfile()
    {
        CreateMap<Artist, ArtistDto>()
            .ForMember(dest => dest.AlbumsCount, opt => opt.MapFrom(src => src.Albums.Count))
            .ForMember(dest => dest.FollowersCount, opt => opt.MapFrom(src => src.Followers.Count));
    }
}