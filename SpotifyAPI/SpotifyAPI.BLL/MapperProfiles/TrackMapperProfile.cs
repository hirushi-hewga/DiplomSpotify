using AutoMapper;
using SpotifyAPI.BLL.DTOs.Track;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.BLL.MapperProfiles;

public class TrackMapperProfile : Profile
{
    public TrackMapperProfile()
    {
        CreateMap<Track, TrackDto>()
            .ForMember(dest => dest.Artist, opt => opt.MapFrom(src => src.Album.Artist.Name));
    }
}