using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.BLL.DTOs;
using SpotifyAPI.BLL.DTOs.Track;
using SpotifyAPI.DAL.Repositories.Track;

namespace SpotifyAPI.BLL.Services.Track;

public class TrackService : ITrackService
{
    private readonly ITrackRepository _repository;
    private readonly IMapper _mapper;

    public TrackService(ITrackRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }
    
    public async Task<ServiceResponse> GetPagedAsync(int page, int pageSize)
    {
        var tracksQuery = _repository
            .GetAll()
            .ProjectTo<TrackDto>(_mapper.ConfigurationProvider);
        
        var paged = await tracksQuery.ToPageAsync(new PageQuery
        {
            Page = page,
            PageSize = pageSize
        });
        
        if (paged.Total == 0)
            return new ServiceResponse("Tracks not found");
        
        return new ServiceResponse("Tracks loaded", true, paged);
    }

    public async Task<ServiceResponse> RecentlyPlayedAsync(string userId, int count)
    {
        var recentlyPlayed = await _repository
            .RecentlyPlayed(userId, count)
            .Select(p => new TrackDto
            {
                Id = p.Track!.Id,
                Name = p.Track!.Name,
                Duration = p.Track!.Duration,
                Path = p.Track!.Path,
                Image = p.Track!.Image,
                Artist = p.Track!.Album!.Artist!.Name
            }).ToListAsync();
        
        if (recentlyPlayed.Count == 0)
            return new ServiceResponse("Tracks not found");
        
        return new ServiceResponse("Tracks loaded", true, recentlyPlayed);
    }

    public async Task<ServiceResponse> CreateRecentlyPlayedAsync(string userId, string trackId)
    {
        if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(trackId))
            return new ServiceResponse("Invalid userId or trackId");

        var ok = await _repository.UpsertAsync(userId, trackId);
        
        if (!ok) 
            return new ServiceResponse("Track not found or cannot create recently played");

        return new ServiceResponse("Recently played saved", true);
    }

    public async Task<ServiceResponse> GetByAlbumAsync(string albumId)
    {
        var tracks = await _repository
            .GetByAlbum(albumId)
            .ProjectTo<TrackDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        
        if (tracks.Count == 0)
            return new ServiceResponse("Tracks not found");
        
        return new ServiceResponse("Tracks loaded", true, tracks);
    }
}