using Microsoft.EntityFrameworkCore;
using SpotifyAPI.BLL.Services;
using SpotifyAPI.DAL;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.DataInitializer;

public sealed class GenreSeedService
{
    private readonly AppDbContext _db;

    public GenreSeedService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<ServiceResponse> SeedGenresAsync(CancellationToken ct = default)
    {
        var random = new Random();

        var genreNames = new[]
        {
            "Pop",
            "Dance",
            "Rock",
            "Hip-Hop",
            "Jazz",
            "Electronic",
            "Indie",
            "Ambient",
            "Lo-fi",
            "Soul"
        };

        var genres = await _db.Genres.ToListAsync(ct);

        if (genres.Count == 0)
        {
            genres = genreNames.Select(name => new Genre
            {
                Id = Guid.NewGuid().ToString(),
                Name = name,
                Image = ""
            }).ToList();

            _db.Genres.AddRange(genres);
            await _db.SaveChangesAsync(ct);
        }

        var tracks = await _db.Tracks
            .AsNoTracking()
            .Select(t => t.Id)
            .ToListAsync(ct);

        if (tracks.Count == 0)
            return new ServiceResponse("No tracks found");

        var existingLinks = await _db.Set<TrackGenre>()
            .AsNoTracking()
            .Select(x => new { x.TrackId, x.GenreId })
            .ToListAsync(ct);

        var existingSet = existingLinks
            .Select(x => $"{x.TrackId}:{x.GenreId}")
            .ToHashSet();

        var trackGenresToAdd = new List<TrackGenre>();

        foreach (var trackId in tracks)
        {
            int genreCount = random.Next(1, 4); // 1-3 жанри

            var selectedGenres = genres
                .OrderBy(_ => random.Next())
                .Take(genreCount)
                .ToList();

            foreach (var genre in selectedGenres)
            {
                var key = $"{trackId}:{genre.Id}";

                if (existingSet.Contains(key))
                    continue;

                trackGenresToAdd.Add(new TrackGenre
                {
                    TrackId = trackId,
                    GenreId = genre.Id
                });

                existingSet.Add(key);
            }
        }

        if (trackGenresToAdd.Count == 0)
            return new ServiceResponse("Genres already assigned", true);

        _db.Set<TrackGenre>().AddRange(trackGenresToAdd);
        await _db.SaveChangesAsync(ct);

        return new ServiceResponse(
            $"Genres assigned successfully. Added {trackGenresToAdd.Count} relations.",
            true
        );
    }
}