using AutoMapper;
using SpotifyAPI.BLL.DTOs.Track;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.BLL.MapperProfiles;

public class TrackMapperProfile : Profile
{
    public TrackMapperProfile()
    {
        CreateMap<Track, TrackDto>()
            .ForMember(dest => dest.Artist, opt => opt.MapFrom(src => src.Album!.Artist!.Name))
            .ForMember(dest => dest.IsLiked, opt =>
                opt.MapFrom((src, dest, _, context) =>
                    src.Likes.Any(l => l.UserId == (string)context.Items["userId"])));
    }
}