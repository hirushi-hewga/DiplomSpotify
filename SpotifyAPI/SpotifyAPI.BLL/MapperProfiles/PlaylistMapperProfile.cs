using AutoMapper;
using SpotifyAPI.BLL.DTOs.Playlist;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.BLL.MapperProfiles;

public class PlaylistMapperProfile : Profile
{
    public PlaylistMapperProfile()
    {
        CreateMap<PlaylistCreateDto, Playlist>()
            .ForMember(d => d.Id,
                opt => opt.MapFrom(_ => Guid.NewGuid().ToString()))

            .ForMember(d => d.Image, opt => opt.Ignore())
            .ForMember(d => d.User, opt => opt.Ignore())
            .ForMember(d => d.Tracks, opt => opt.Ignore());
        CreateMap<Playlist, PlaylistCreateDto>();
        CreateMap<Playlist, PlaylistDto>();
    }
}