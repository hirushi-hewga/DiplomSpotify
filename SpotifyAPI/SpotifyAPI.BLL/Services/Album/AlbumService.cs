using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.BLL.DTOs;
using SpotifyAPI.BLL.DTOs.Album;
using SpotifyAPI.BLL.DTOs.Track;
using SpotifyAPI.DAL.Repositories.Album;

namespace SpotifyAPI.BLL.Services.Album;

public class AlbumService : IAlbumService
{
    private readonly IAlbumRepository _repository;
    private readonly IMapper _mapper;

    public AlbumService(IAlbumRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }
    
    public async Task<ServiceResponse> GetPagedAsync(string userId, int page, int pageSize)
    {
        var albumsQuery = _repository
            .GetAll()
            .Select(a => new AlbumDto
            {
                Id = a.Id,
                Name = a.Name,
                Artist = a.Artist.Name,
                TracksCount = a.Tracks.Count,
                Image = a.Image,
                Tracks = a.Tracks.Select(t => new TrackDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Duration = t.Duration,
                    Path = t.Path,
                    Image = t.Image,
                    Artist = t.Album.Artist.Name,
                    IsLiked = t.Likes.Any(l => l.UserId == userId)
                }).ToList()
            });

        var paged = await albumsQuery.ToPageAsync(new PageQuery
        {
            Page = page,
            PageSize = pageSize
        });
        
        if (paged.Total == 0)
            return new ServiceResponse("Albums not found");
        
        return new ServiceResponse("Albums loaded", true, paged);
    }

    public async Task<ServiceResponse> GetLikedAsync(string userId)
    {
        var liked = await _repository
            .GetByUser(userId)
            .Select(a => new AlbumDto
            {
                Id = a.Id,
                Name = a.Name,
                Artist = a.Artist.Name,
                TracksCount = a.Tracks.Count,
                Image = a.Image,
                Tracks = a.Tracks.Select(t => new TrackDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Duration = t.Duration,
                    Path = t.Path,
                    Image = t.Image,
                    Artist = t.Album.Artist.Name,
                    IsLiked = t.Likes.Any(l => l.UserId == userId)
                }).ToList()
            }).ToListAsync();
        
        if (liked.Count == 0)
            return new ServiceResponse("Albums not found");
        
        return new ServiceResponse("Albums loaded", true, liked);
    }

    public async Task<ServiceResponse> GetRandomAsync(string userId, int count)
    {
        var random = await _repository
            .GetRandom(count)
            .Select(a => new AlbumDto
            {
                Id = a.Id,
                Name = a.Name,
                Artist = a.Artist.Name,
                TracksCount = a.Tracks.Count,
                Image = a.Image,
                Tracks = a.Tracks.Select(t => new TrackDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Duration = t.Duration,
                    Path = t.Path,
                    Image = t.Image,
                    Artist = t.Album.Artist.Name,
                    IsLiked = t.Likes.Any(l => l.UserId == userId)
                }).ToList()
            }).ToListAsync();
        
        if (random.Count == 0)
            return new ServiceResponse("Albums not found");
        
        return new ServiceResponse("Albums loaded", true, random);
    }
}