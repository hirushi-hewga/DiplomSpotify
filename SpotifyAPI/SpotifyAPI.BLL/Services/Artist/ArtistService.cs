using Microsoft.EntityFrameworkCore;
using SpotifyAPI.BLL.DTOs;
using SpotifyAPI.BLL.DTOs.Artist;
using SpotifyAPI.BLL.Services.Image;
using SpotifyAPI.DAL;

namespace SpotifyAPI.BLL.Services.Artist;

public class ArtistService : IArtistService
{
    private readonly AppDbContext _context;
    private readonly IFileService _fileService;

    public ArtistService(AppDbContext context, IFileService imageService)
    {
        _context = context;
        _fileService = imageService;
    }

    public async Task<ServiceResponse> CreateAsync(ArtistCreateDto dto)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return new ServiceResponse("Name is required");

            var entity = new DAL.Entities.Artist
            {
                Name = dto.Name.Trim(),
                Image = ""
            };

            if (dto.Image != null)
            {
                var fileName = await _fileService.SaveImageAsync(dto.Image, Settings.ArtistsPath);
                if (string.IsNullOrEmpty(fileName))
                    return new ServiceResponse("Invalid image");

                entity.Image = Path.Combine(Settings.ArtistsPath, fileName).Replace("\\", "/");
            }

            _context.Artists.Add(entity);
            await _context.SaveChangesAsync();

            return new ServiceResponse("Artist created", true, new { id = entity.Id });
        }
        catch (Exception ex)
        {
            return new ServiceResponse($"CreateAsync exception: {ex.GetType().Name} - {ex.Message}");
        }
    }

    public async Task<ServiceResponse> GetByIdAsync(string id)
    {
        try
        {
            var dto = await _context.Artists
                .AsNoTracking()
                .Where(a => a.Id == id)
                .Select(a => new ArtistDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Image = a.Image,
                    AlbumsCount = a.Albums.Count,
                    FollowersCount = a.Followers.Count
                })
                .FirstOrDefaultAsync();

            if (dto == null)
                return new ServiceResponse("Artist not found");

            return new ServiceResponse("Artist loaded", true, dto);
        }
        catch (Exception ex)
        {
            return new ServiceResponse($"GetByIdAsync exception: {ex.GetType().Name} - {ex.Message}");
        }
    }

    public async Task<ServiceResponse> UpdateAsync(ArtistUpdateDto dto)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto.Id))
                return new ServiceResponse("Id is required");

            var entity = await _context.Artists.FirstOrDefaultAsync(a => a.Id == dto.Id);
            if (entity == null)
                return new ServiceResponse("Artist not found");

            if (!string.IsNullOrWhiteSpace(dto.Name))
                entity.Name = dto.Name.Trim();

            if (dto.Image != null)
            {
                var oldPath = entity.Image;

                var fileName = await _fileService.SaveImageAsync(dto.Image, Settings.ArtistsPath);
                if (string.IsNullOrEmpty(fileName))
                    return new ServiceResponse("Invalid image");

                entity.Image = Path.Combine(Settings.ArtistsPath, fileName).Replace("\\", "/");

                if (!string.IsNullOrEmpty(oldPath))
                    _fileService.Delete(oldPath);
            }

            entity.UpdatedDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new ServiceResponse("Artist updated", true);
        }
        catch (Exception ex)
        {
            return new ServiceResponse($"UpdateAsync exception: {ex.GetType().Name} - {ex.Message}");
        }
    }

    public async Task<ServiceResponse> DeleteAsync(string id)
    {
        try
        {
            var entity = await _context.Artists.FirstOrDefaultAsync(a => a.Id == id);
            if (entity == null)
                return new ServiceResponse("Artist not found");

            if (!string.IsNullOrEmpty(entity.Image))
                _fileService.Delete(entity.Image);

            _context.Artists.Remove(entity);
            await _context.SaveChangesAsync();

            return new ServiceResponse("Artist deleted", true);
        }
        catch (Exception ex)
        {
            return new ServiceResponse($"DeleteAsync exception: {ex.GetType().Name} - {ex.Message}");
        }
    }

    public async Task<ServiceResponse> GetPageAsync(PageQuery q)
    {
        try
        {
            var query = _context.Artists.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(q.Search))
            {
                var s = q.Search.Trim().ToLower();
                query = query.Where(a => a.Name.ToLower().Contains(s));
            }

            var dirDesc = string.Equals(q.SortDir, "desc", StringComparison.OrdinalIgnoreCase);

            query = (q.SortBy?.ToLower()) switch
            {
                "name" => dirDesc ? query.OrderByDescending(a => a.Name) : query.OrderBy(a => a.Name),
                "created" => dirDesc ? query.OrderByDescending(a => a.CreatedDate) : query.OrderBy(a => a.CreatedDate),
                _ => query.OrderBy(a => a.Name)
            };

            var projected = query.Select(a => new ArtistDto
            {
                Id = a.Id,
                Name = a.Name,
                Image = a.Image,
                AlbumsCount = a.Albums.Count,
                FollowersCount = a.Followers.Count
            });

            var page = await projected.ToPageAsync(q);

            return new ServiceResponse("Artists loaded", true, page);
        }
        catch (Exception ex)
        {
            return new ServiceResponse($"GetPageAsync exception: {ex.GetType().Name} - {ex.Message}");
        }
    }

    public async Task<ServiceResponse> GetFavouriteAsync(string userId)
    {
        try
        {
            var favourite = await _context.Artists
                .AsNoTracking()
                .Where(a => a.Followers.Any(f => f.UserId == userId))
                .ToListAsync();

            return new ServiceResponse("Artists loaded", true, favourite);
        }
        catch (Exception ex)
        {
            return new ServiceResponse($"GetPageAsync exception: {ex.GetType().Name} - {ex.Message}");
        }
    }
}