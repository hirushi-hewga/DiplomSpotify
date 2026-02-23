using System.Net.Http.Json;

namespace SpotifyAPI.BLL.DTOs.Deezer;

public sealed class DeezerPage<T>
{
    public List<T> Data { get; set; } = new();
    public string? Next { get; set; }
    
    private async Task<List<T>> FetchAllPagesAsync<T>(HttpClient client, string firstUrl, CancellationToken ct)
    {
        var result = new List<T>();

        string? url = firstUrl;

        while (!string.IsNullOrEmpty(url))
        {
            ct.ThrowIfCancellationRequested();

            DeezerPage<T>? page;

            // Deezer "next" може бути абсолютним URL, тому обробимо обидва варіанти
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
}

public sealed class DeezerList<T>
{
    public List<T> Data { get; set; } = new();
}

public sealed class DeezerArtistDto
{
    public long Id { get; set; }
    public string Name { get; set; } = "";
    public string? Picture_Xl { get; set; }
}

public sealed class DeezerAlbumDto
{
    public long Id { get; set; }
    public string Title { get; set; } = "";
    public string? Cover_Big { get; set; }
    public string? Release_Date { get; set; }
}

public sealed class DeezerTrackDto
{
    public long Id { get; set; }
    public string Title { get; set; } = "";
    public int Duration { get; set; }
    public string? Preview { get; set; }
}