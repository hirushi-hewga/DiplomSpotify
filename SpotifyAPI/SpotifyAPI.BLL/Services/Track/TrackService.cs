using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.BLL.DTOs;
using SpotifyAPI.BLL.DTOs.Track;
using SpotifyAPI.DAL.Entities;
using SpotifyAPI.DAL.Repositories;
using SpotifyAPI.DAL.Repositories.Track;

namespace SpotifyAPI.BLL.Services.Track;

public class TrackService : ITrackService
{
    private readonly ITrackRepository _repository;

    public TrackService(ITrackRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<ServiceResponse> GetPagedAsync(string userId, int page, int pageSize)
    {
        var tracksQuery = _repository
            .GetAll()
            .Select(t => new TrackDto
            {
                Id = t.Id,
                Name = t.Name,
                Duration = t.Duration,
                Path = t.Path,
                Image = t.Image,
                Artist = t.Album.Artist.Name,
                IsLiked = t.Likes.Any(l => l.UserId == userId)
            });
        
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
                Artist = p.Track!.Album!.Artist!.Name,
                IsLiked = p.Track.Likes.Any(l => l.UserId == userId),
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

    public async Task<ServiceResponse> GetByAlbumAsync(string userId, string albumId)
    {
        var tracks = await _repository
            .GetByAlbum(albumId)
            .Select(t => new TrackDto
            {
                Id = t.Id,
                Name = t.Name,
                Duration = t.Duration,
                Path = t.Path,
                Image = t.Image,
                Artist = t.Album.Artist.Name,
                IsLiked = t.Likes.Any(l => l.UserId == userId)
            })
            .ToListAsync();
        
        if (tracks.Count == 0)
            return new ServiceResponse("Tracks not found", false, tracks);
        
        return new ServiceResponse("Tracks loaded", true, tracks);
    }

    public async Task<ServiceResponse> GetLikedAsync(string userId, int page, int pageSize)
    {
        var tracksQuery = _repository
            .GetLiked(userId)
            .Select(t => new TrackDto
            {
                Id = t.Id,
                Name = t.Name,
                Duration = t.Duration,
                Path = t.Path,
                Image = t.Image,
                Artist = t.Album.Artist.Name,
                IsLiked = t.Likes.Any(l => l.UserId == userId)
            });
        
        var paged = await tracksQuery.ToPageAsync(new PageQuery
        {
            Page = page,
            PageSize = pageSize
        });
        
        if (paged.Total == 0)
            return new ServiceResponse("Tracks not found");
        
        return new ServiceResponse("Tracks loaded", true, paged);
    }

    public async Task<ServiceResponse> GetByQueryAsync(string userId, string query, int count)
    {
        var tracks = await _repository
            .GetByQuery(query, count)
            .Select(t => new TrackDto
            {
                Id = t.Id,
                Name = t.Name,
                Duration = t.Duration,
                Path = t.Path,
                Image = t.Image,
                Artist = t.Album.Artist.Name,
                IsLiked = t.Likes.Any(l => l.UserId == userId)
            })
            .ToListAsync();
        
        if (tracks.Count == 0)
            return new ServiceResponse("Tracks not found", false, tracks);
        
        return new ServiceResponse("Tracks loaded", true, tracks);
    }

    public async Task<ServiceResponse> GetByGenreAsync(string userId, string genre, int page, int pageSize)
    {
        var tracksQuery = _repository
            .GetByGenre(genre)
            .Select(t => new TrackDto
            {
                Id = t.Id,
                Name = t.Name,
                Duration = t.Duration,
                Path = t.Path,
                Image = t.Image,
                Artist = t.Album.Artist.Name,
                IsLiked = t.Likes.Any(l => l.UserId == userId)
            });
        
        var paged = await tracksQuery.ToPageAsync(new PageQuery
        {
            Page = page,
            PageSize = pageSize
        });
        
        if (paged.Total == 0)
            return new ServiceResponse("Tracks not found");
        
        return new ServiceResponse("Tracks loaded", true, paged);
    }
}