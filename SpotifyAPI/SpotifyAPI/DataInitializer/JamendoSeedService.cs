using System.Globalization;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using SpotifyAPI.BLL;
using SpotifyAPI.BLL.Services;
using SpotifyAPI.BLL.Services.Image;
using SpotifyAPI.DAL;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.DataInitializer;

public sealed class JamendoSeedService
{
    private readonly AppDbContext _db;
    private readonly IHttpClientFactory _httpFactory;
    private readonly IFileService _files;
    private readonly string _clientId;
    private DateTime _cooldownUntilUtc = DateTime.MinValue;
    private static readonly TimeSpan ApiDelay = TimeSpan.FromMilliseconds(1200);

    private async Task ThrottleAsync(CancellationToken ct)
    {
        var now = DateTime.UtcNow;
        if (now < _cooldownUntilUtc)
            await Task.Delay(_cooldownUntilUtc - now, ct);

        await Task.Delay(ApiDelay, ct);
    }

    public JamendoSeedService(
        AppDbContext db,
        IHttpClientFactory httpFactory,
        IFileService files,
        string clientId)
    {
        _db = db;
        _httpFactory = httpFactory;
        _files = files;
        _clientId = clientId;
    }

    private sealed class JamendoListResponse<T>
    {
        [JsonPropertyName("headers")]
        public JamendoHeaders Headers { get; set; } = new();

        [JsonPropertyName("results")]
        public List<T> Results { get; set; } = new();
    }

    private sealed class JamendoHeaders
    {
        [JsonPropertyName("status")]
        public string Status { get; set; } = "";

        [JsonPropertyName("code")]
        public int Code { get; set; }

        [JsonPropertyName("error_message")]
        public string ErrorMessage { get; set; } = "";

        [JsonPropertyName("results_count")]
        public int ResultsCount { get; set; }

        [JsonPropertyName("next")]
        public string? Next { get; set; }
    }

    private sealed class JamendoArtistDto
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = "";

        [JsonPropertyName("name")]
        public string Name { get; set; } = "";

        [JsonPropertyName("image")]
        public string? Image { get; set; }
    }

    private sealed class JamendoArtistWithAlbumsDto
    {
        [JsonPropertyName("id")]
        public string ArtistId { get; set; } = "";

        [JsonPropertyName("name")]
        public string ArtistName { get; set; } = "";

        [JsonPropertyName("image")]
        public string? ArtistImage { get; set; }

        [JsonPropertyName("albums")]
        public List<JamendoAlbumDto> Albums { get; set; } = new();
    }

    private sealed class JamendoAlbumDto
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = "";

        [JsonPropertyName("name")]
        public string Name { get; set; } = "";

        [JsonPropertyName("releasedate")]
        public string? ReleaseDate { get; set; }

        [JsonPropertyName("image")]
        public string? Image { get; set; }
    }

    private sealed class JamendoAlbumWithTracksDto
    {
        [JsonPropertyName("id")]
        public string AlbumId { get; set; } = "";

        [JsonPropertyName("name")]
        public string AlbumName { get; set; } = "";

        [JsonPropertyName("releasedate")]
        public string? ReleaseDate { get; set; }

        [JsonPropertyName("artist_id")]
        public string ArtistId { get; set; } = "";

        [JsonPropertyName("artist_name")]
        public string ArtistName { get; set; } = "";

        [JsonPropertyName("tracks")]
        public List<JamendoTrackDto> Tracks { get; set; } = new();
    }

    private sealed class JamendoTrackDto
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = "";

        [JsonPropertyName("name")]
        public string Name { get; set; } = "";

        [JsonPropertyName("duration")]
        public string Duration { get; set; } = "0";

        [JsonPropertyName("audio")]
        public string? Audio { get; set; }
    }

    public async Task<ServiceResponse> SeedGuaranteedAsync(
    int targetTracks = 3000,
    int maxAlbumsPerArtist = 3,
    int maxTracksPerAlbum = 20,
    CancellationToken ct = default)
{
    _db.ChangeTracker.AutoDetectChangesEnabled = false;

    try
    {
        if (await _db.Tracks.AsNoTracking().AnyAsync(ct) ||
            await _db.Albums.AsNoTracking().AnyAsync(ct) ||
            await _db.Artists.AsNoTracking().AnyAsync(ct))
        {
            return new ServiceResponse("Seed skipped: DB is not empty.", true);
        }

        var client = _httpFactory.CreateClient();
        client.BaseAddress = new Uri("https://api.jamendo.com/v3.0/");
        client.Timeout = TimeSpan.FromMinutes(10);

        int createdArtists = 0, createdAlbums = 0, createdTracks = 0;

        string url =
            $"artists?client_id={_clientId}&limit=200&offset=0&hasimage=true&order=popularity_total";

        var seenArtistIds = new HashSet<string>();

        while (!string.IsNullOrWhiteSpace(url) && createdTracks < targetTracks)
        {
            ct.ThrowIfCancellationRequested();

            await ThrottleAsync(ct);
            var artistsPage = await GetFromJsonWithRetryAsync<JamendoListResponse<JamendoArtistDto>>(client, url, ct);
            if (artistsPage == null)
            {
                await Task.Delay(TimeSpan.FromMinutes(2), ct);
                continue;
            }

            var candidates = artistsPage.Results;
            if (candidates.Count == 0) break;

            foreach (var cand in candidates)
            {
                if (createdTracks >= targetTracks) break;
                ct.ThrowIfCancellationRequested();

                if (string.IsNullOrWhiteSpace(cand.Id) ||
                    string.IsNullOrWhiteSpace(cand.Name) ||
                    string.IsNullOrWhiteSpace(cand.Image))
                    continue;

                if (!seenArtistIds.Add(cand.Id))
                    continue;

                var albums = await GetArtistAlbumsAsync(client, cand.Id, ct);
                if (albums.Count == 0) continue;

                var albumCandidates = albums
                    .Where(a => !string.IsNullOrWhiteSpace(a.Id) &&
                                !string.IsNullOrWhiteSpace(a.Name) &&
                                !string.IsNullOrWhiteSpace(a.Image))
                    .Take(maxAlbumsPerArtist)
                    .ToList();

                if (albumCandidates.Count == 0) continue;

                var artistImgRel = await _files.SaveImageFromUrlAsync(cand.Image, Settings.ArtistsPath, ct);
                var artistEntity = new Artist
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = cand.Name,
                    Image = artistImgRel is null ? "" : $"/data/{artistImgRel}"
                };

                _db.Artists.Add(artistEntity);
                await _db.SaveChangesAsync(ct);
                createdArtists++;

                var artistId = artistEntity.Id;

                foreach (var alb in albumCandidates)
                {
                    if (createdTracks >= targetTracks) break;
                    ct.ThrowIfCancellationRequested();

                    var albumTracks = await GetAlbumTracksAsync(client, alb.Id, ct);
                    var playable = albumTracks
                        .Where(t => !string.IsNullOrWhiteSpace(t.Audio) && !string.IsNullOrWhiteSpace(t.Name))
                        .Take(maxTracksPerAlbum)
                        .ToList();

                    if (playable.Count == 0) continue;

                    var albumCoverRel = await _files.SaveImageFromUrlAsync(alb.Image!, Settings.AlbumsPath, ct);
                    var release = ParseDateOnly(alb.ReleaseDate) ?? DateOnly.FromDateTime(DateTime.UtcNow);

                    var albumEntity = new Album
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = alb.Name,
                        Image = albumCoverRel is null ? "" : $"/data/{albumCoverRel}",
                        ArtistId = artistId,
                        ReleaseDate = release
                    };

                    _db.Albums.Add(albumEntity);
                    createdAlbums++;

                    var albumId = albumEntity.Id;

                    var remaining = targetTracks - createdTracks;
                    foreach (var tr in playable.Take(remaining))
                    {
                        _db.Tracks.Add(new Track
                        {
                            Id = Guid.NewGuid().ToString(),
                            Name = tr.Name,
                            Duration = ParseInt(tr.Duration),
                            AlbumId = albumId,
                            Image = albumEntity.Image,
                            Path = tr.Audio!
                        });

                        createdTracks++;
                    }

                    await _db.SaveChangesAsync(ct);
                    _db.ChangeTracker.Clear();
                }
            }

            url = artistsPage.Headers.Next ?? "";
        }

        if (createdTracks < targetTracks)
        {
            return new ServiceResponse(
                $"Seed finished but not enough tracks. Tracks={createdTracks}/{targetTracks}, Artists={createdArtists}, Albums={createdAlbums}",
                false);
        }

        return new ServiceResponse(
            $"Seed done ✅ Artists={createdArtists}, Albums={createdAlbums}, Tracks={createdTracks}",
            true);
    }
    catch (Exception ex)
    {
        return new ServiceResponse($"SeedGuaranteedAsync exception: {ex.GetType().Name} - {ex.Message}");
    }
    finally
    {
        _db.ChangeTracker.AutoDetectChangesEnabled = true;
    }
}


    private async Task<List<JamendoAlbumDto>> GetArtistAlbumsAsync(HttpClient client, string artistId, CancellationToken ct)
    {
        var url = $"artists/albums?client_id={_clientId}&id={Uri.EscapeDataString(artistId)}";
        await ThrottleAsync(ct);
        var res = await GetFromJsonWithRetryAsync<JamendoListResponse<JamendoArtistWithAlbumsDto>>(client, url, ct);

        var first = res?.Results?.FirstOrDefault();
        var albums = first?.Albums ?? new List<JamendoAlbumDto>();

        return albums
            .Where(a => !string.IsNullOrWhiteSpace(a.Id) && !string.IsNullOrWhiteSpace(a.Name))
            .ToList();
    }

    private async Task<List<JamendoTrackDto>> GetAlbumTracksAsync(HttpClient client, string albumId, CancellationToken ct)
    {
        var url = $"albums/tracks?client_id={_clientId}&id={Uri.EscapeDataString(albumId)}";
        await ThrottleAsync(ct);
        var res = await GetFromJsonWithRetryAsync<JamendoListResponse<JamendoAlbumWithTracksDto>>(client, url, ct);

        var first = res?.Results?.FirstOrDefault();
        return first?.Tracks ?? new List<JamendoTrackDto>();
    }


    private static DateOnly? ParseDateOnly(string? s)
    {
        if (string.IsNullOrWhiteSpace(s)) return null;
        return DateOnly.TryParseExact(s, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var d)
            ? d
            : null;
    }

    private static int ParseInt(string? s)
    {
        if (string.IsNullOrWhiteSpace(s)) return 0;
        return int.TryParse(s, NumberStyles.Integer, CultureInfo.InvariantCulture, out var v) ? v : 0;
    }
    
    private static bool IsRetryable(HttpStatusCode code) =>
        code == (HttpStatusCode)429 ||
        code == HttpStatusCode.RequestTimeout ||
        code == HttpStatusCode.TooManyRequests ||
        code == HttpStatusCode.ServiceUnavailable ||
        code == HttpStatusCode.BadGateway ||
        code == HttpStatusCode.GatewayTimeout;

    private async Task<T?> GetFromJsonWithRetryAsync<T>(HttpClient client, string url, CancellationToken ct)
    {
        const int maxRetries = 8;
        var delay = TimeSpan.FromSeconds(2);

        for (int attempt = 1; attempt <= maxRetries; attempt++)
        {
            ct.ThrowIfCancellationRequested();

            try
            {
                using var res = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, ct);

                if (res.IsSuccessStatusCode)
                    return await res.Content.ReadFromJsonAsync<T>(cancellationToken: ct);

                if (!IsRetryable(res.StatusCode))
                {
                    var body = await res.Content.ReadAsStringAsync(ct);
                    throw new HttpRequestException($"HTTP {(int)res.StatusCode} {res.ReasonPhrase}. Body: {body}");
                }

                if (res.StatusCode == (HttpStatusCode)429)
                {
                    var extra = res.Headers.RetryAfter?.Delta ?? TimeSpan.FromMinutes(2);
                    _cooldownUntilUtc = DateTime.UtcNow.Add(extra);
                    await Task.Delay(extra, ct);
                }
                else
                {
                    await Task.Delay(delay, ct);
                }
            }
            catch (TaskCanceledException) when (!ct.IsCancellationRequested)
            {
                await Task.Delay(delay, ct);
            }

            delay = TimeSpan.FromSeconds(Math.Min(delay.TotalSeconds * 2, 60));
        }

        await Task.Delay(TimeSpan.FromMinutes(2), ct);
        return default;
    }
}