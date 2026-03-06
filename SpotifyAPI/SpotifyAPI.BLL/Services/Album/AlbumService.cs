using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.BLL.DTOs;
using SpotifyAPI.BLL.DTOs.Album;
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
    
    public async Task<ServiceResponse> GetPagedAsync(int page, int pageSize)
    {
        var albumsQuery = _repository
            .GetAll()
            .ProjectTo<AlbumDto>(_mapper.ConfigurationProvider);

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
            .ProjectTo<AlbumDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        
        if (liked.Count == 0)
            return new ServiceResponse("Albums not found");
        
        return new ServiceResponse("Albums loaded", true, liked);
    }
}