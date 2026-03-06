using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.BLL.DTOs;
using SpotifyAPI.BLL.DTOs.Playlist;
using SpotifyAPI.BLL.Services.Image;
using SpotifyAPI.DAL;
using SpotifyAPI.DAL.Repositories;
using SpotifyAPI.DAL.Repositories.Playlist;

namespace SpotifyAPI.BLL.Services.Playlist;

public class PlaylistService : IPlaylistService
{
    private readonly IMapper _mapper;
    private readonly IPlaylistRepository _repository;
    private readonly IFileService _fileService;

    public PlaylistService(IMapper mapper, IPlaylistRepository repository, IFileService fileService)
    {
        _mapper = mapper;
        _repository = repository;
        _fileService = fileService;
    }

    public async Task<ServiceResponse> GetAllAsync(string userId)
    {
        var playlists = await _repository
            .GetByUser(userId)
            .ToListAsync();
        
        if (playlists.Count == 0)
            return new ServiceResponse("Playlists not found");
        
        var dtos = _mapper.Map<List<PlaylistDto>>(playlists);
        
        return new ServiceResponse("Playlists loaded", true, dtos);
    }

    public async Task<ServiceResponse> GetPagedAsync(string userId, int page, int pageSize)
    {
        var playlistsQuery = _repository
            .GetByUser(userId)
            .ProjectTo<PlaylistDto>(_mapper.ConfigurationProvider);

        
        var paged = await playlistsQuery.ToPageAsync(new PageQuery
        {
            Page = page,
            PageSize = pageSize
        });
        
        if (paged.Total == 0)
            return new ServiceResponse("Playlists not found");
        
        return new ServiceResponse("Playlists loaded", true, paged);
    }

    public async Task<ServiceResponse> GetByIdAsync(string id)
    {
        var playlist = await _repository.GetByIdAsync(id);
        
        if (playlist == null)
            return new ServiceResponse("Playlist not found");
        
        var dto = _mapper.Map<PlaylistDto>(playlist);
        return new ServiceResponse("Playlist loaded", true, dto);
    }

    public async Task<ServiceResponse> CreateAsync(PlaylistCreateDto dto)
    {
        dto.Title = dto.Title.Trim();
        dto.Name = dto.Name.Trim();
        
        if (await _repository.GetByTitleAsync(dto.Title, dto.UserId) != null)
            return new ServiceResponse("Playlist with this title already exists");
        
        var entity = _mapper.Map<DAL.Entities.Playlist>(dto);

        if (dto.Image != null)
        {
            var imageName = await _fileService.SaveImageAsync(dto.Image, Settings.PlaylistsPath);
            if (!string.IsNullOrEmpty(imageName))
                entity.Image = imageName;
        }

        if (await _repository.CreateAsync(entity))
            return new ServiceResponse("Playlist created", true);
        
        return new ServiceResponse("Error creating new playlist");
        
    }
}