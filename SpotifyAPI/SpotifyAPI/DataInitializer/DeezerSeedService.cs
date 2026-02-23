using System.Globalization;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.BLL;
using SpotifyAPI.BLL.DTOs.Deezer;
using SpotifyAPI.BLL.Services;
using SpotifyAPI.BLL.Services.Image;
using SpotifyAPI.DAL;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.DataInitializer;

public sealed class DeezerSeedService
{
    private readonly AppDbContext _db;
    private readonly IHttpClientFactory _httpFactory;
    private readonly IFileService _files;

    public DeezerSeedService(AppDbContext db, IHttpClientFactory httpFactory, IFileService files)
    {
        _db = db;
        _httpFactory = httpFactory;
        _files = files;
    }

    public async Task<ServiceResponse> SeedOnceAsync(CancellationToken ct = default)
    {
        try
        {
            // ✅ захист від повтору
            if (await _db.Artists.AsNoTracking().AnyAsync(ct))
                return new ServiceResponse("Already seeded (Artists not empty).", true);

            var client = _httpFactory.CreateClient();
            client.BaseAddress = new Uri("https://api.deezer.com/");
            client.Timeout = TimeSpan.FromSeconds(60);

            // ✅ 50 артистів
            var top = await client.GetFromJsonAsync<DeezerPage<DeezerArtistDto>>("chart/0/artists?limit=50", ct);
            if (top?.Data == null || top.Data.Count == 0)
                return new ServiceResponse("No artists from Deezer.", false);

            int aCount = 0, alCount = 0, tCount = 0;

            foreach (var a in top.Data)
            {
                ct.ThrowIfCancellationRequested();

                var artistImgRel = await _files.SaveImageFromUrlAsync(a.Picture_Xl ?? "", Settings.ArtistsPath, ct);

                var artist = new Artist
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = a.Name,
                    Image = artistImgRel is null ? "" : $"/data/{artistImgRel}"
                };

                _db.Artists.Add(artist);
                await _db.SaveChangesAsync(ct);
                aCount++;

                // ✅ всі альбоми
                var albums = await FetchAllPagesAsync<DeezerAlbumDto>(client, $"artist/{a.Id}/albums?limit=25", ct);

                foreach (var alb in albums)
                {
                    var albumImgRel = await _files.SaveImageFromUrlAsync(alb.Cover_Big ?? "", Settings.AlbumsPath, ct);

                    var album = new Album
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = alb.Title,
                        Image = albumImgRel is null ? "" : $"/data/{albumImgRel}",
                        ArtistId = artist.Id,
                        ReleaseDate = ParseDateOnly(alb.Release_Date) ?? DateOnly.FromDateTime(DateTime.UtcNow)
                    };

                    _db.Albums.Add(album);
                    await _db.SaveChangesAsync(ct);
                    alCount++;

                    // ✅ всі треки
                    var tracks = await FetchAllPagesAsync<DeezerTrackDto>(client, $"album/{alb.Id}/tracks?limit=100", ct);

                    foreach (var tr in tracks)
                    {
                        var audioRel = await _files.SaveAudioFromUrlAsync(tr.Preview ?? "", ct);

                        _db.Tracks.Add(new Track
                        {
                            Id = Guid.NewGuid().ToString(),
                            Name = tr.Title,
                            Duration = tr.Duration,
                            AlbumId = album.Id,
                            Image = album.Image,
                            Path = audioRel is null ? "" : $"/data/{audioRel}"
                        });
                        tCount++;
                    }

                    await _db.SaveChangesAsync(ct);
                    _db.ChangeTracker.Clear();
                }
            }

            return new ServiceResponse($"Seed done: Artists={aCount}, Albums={alCount}, Tracks={tCount}", true);
        }
        catch (Exception ex)
        {
            return new ServiceResponse($"SeedOnceAsync exception: {ex.GetType().Name} - {ex.Message}");
        }
    }

    private async Task<List<T>> FetchAllPagesAsync<T>(HttpClient client, string firstUrl, CancellationToken ct)
    {
        var result = new List<T>();
        string? url = firstUrl;

        while (!string.IsNullOrEmpty(url))
        {
            DeezerPage<T>? page;

            if (Uri.TryCreate(url, UriKind.Absolute, out var abs))
                page = await client.GetFromJsonAsync<DeezerPage<T>>(abs, ct);
            else
                page = await client.GetFromJsonAsync<DeezerPage<T>>(url, ct);

            if (page?.Data == null || page.Data.Count == 0)
                break;

            result.AddRange(page.Data);
            url = page.Next;
        }

        return result;
    }

    private static DateOnly? ParseDateOnly(string? s)
    {
        if (string.IsNullOrWhiteSpace(s)) return null;
        return DateOnly.TryParseExact(s, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var d) ? d : null;
    }
}