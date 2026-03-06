using AutoMapper;
using SpotifyAPI.BLL.DTOs.Album;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.BLL.MapperProfiles;

public class AlbumMapperProfile : Profile
{
    public AlbumMapperProfile()
    {
        CreateMap<Album, AlbumDto>()
            .ForMember(dest => dest.TracksCount, opt => opt.MapFrom(src => src.Tracks.Count))
            .ForMember(dest => dest.Artist, opt => opt.MapFrom(src => src.Artist.Name));
    }
}