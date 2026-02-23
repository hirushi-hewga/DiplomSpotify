using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace SpotifyAPI.BLL.Services.Image;

public class FileService : IFileService
{
    private readonly string _dataRoot;
    private readonly IHttpClientFactory _httpFactory;

    public FileService(IWebHostEnvironment env, IHttpClientFactory httpFactory)
    {
        _dataRoot = Path.Combine(env.ContentRootPath, "wwwroot", Settings.StaticPath);
        _httpFactory = httpFactory;
    }

    public async Task<string?> SaveImageAsync(IFormFile file, string folder)
    {
        if (!file.ContentType.StartsWith("image/")) return null;

        var ext = Path.GetExtension(file.FileName);
        var name = $"{Guid.NewGuid()}{ext}";

        var dir = Path.Combine(_dataRoot, folder);
        Directory.CreateDirectory(dir);

        var path = Path.Combine(dir, name);

        using var stream = File.Create(path);
        await file.CopyToAsync(stream);

        return $"{folder}/{name}";
    }

    public async Task<string?> SaveAudioAsync(IFormFile file)
    {
        if (!file.ContentType.StartsWith("audio/")) return null;

        var ext = Path.GetExtension(file.FileName);
        var name = $"{Guid.NewGuid()}{ext}";

        var dir = Path.Combine(_dataRoot, Settings.TracksPath);
        Directory.CreateDirectory(dir);

        var path = Path.Combine(dir, name);

        using var stream = File.Create(path);
        await file.CopyToAsync(stream);

        return $"{Settings.TracksPath}/{name}";
    }

    // ✅ Нове: скачати і зберегти картинку
    public async Task<string?> SaveImageFromUrlAsync(string url, string folder, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(url)) return null;

        var client = _httpFactory.CreateClient();
        using var res = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, ct);
        if (!res.IsSuccessStatusCode) return null;

        var contentType = res.Content.Headers.ContentType?.MediaType ?? "";
        if (!contentType.StartsWith("image/")) return null;

        var ext = GuessExt(contentType, url) ?? ".jpg";
        var name = $"{Guid.NewGuid()}{ext}";

        var dir = Path.Combine(_dataRoot, folder);
        Directory.CreateDirectory(dir);

        var path = Path.Combine(dir, name);

        await using var input = await res.Content.ReadAsStreamAsync(ct);
        await using var output = File.Create(path);
        await input.CopyToAsync(output, ct);

        return $"{folder}/{name}";
    }

    // ✅ Нове: скачати і зберегти аудіо (preview mp3)
    public async Task<string?> SaveAudioFromUrlAsync(string url, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(url)) return null;

        var client = _httpFactory.CreateClient();
        using var res = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, ct);
        if (!res.IsSuccessStatusCode) return null;

        var contentType = res.Content.Headers.ContentType?.MediaType ?? "";
        // Deezer preview зазвичай audio/mpeg
        if (!contentType.StartsWith("audio/") && !url.EndsWith(".mp3", StringComparison.OrdinalIgnoreCase))
            return null;

        var ext = GuessExt(contentType, url) ?? ".mp3";
        var name = $"{Guid.NewGuid()}{ext}";

        var dir = Path.Combine(_dataRoot, Settings.TracksPath);
        Directory.CreateDirectory(dir);

        var path = Path.Combine(dir, name);

        await using var input = await res.Content.ReadAsStreamAsync(ct);
        await using var output = File.Create(path);
        await input.CopyToAsync(output, ct);

        return $"{Settings.TracksPath}/{name}";
    }

    public void Delete(string relativePath)
    {
        var fullPath = Path.Combine(_dataRoot, relativePath);
        if (File.Exists(fullPath))
            File.Delete(fullPath);
    }

    private static string? GuessExt(string contentType, string url)
    {
        // 1) по content-type
        return contentType switch
        {
            "image/jpeg" => ".jpg",
            "image/png" => ".png",
            "image/webp" => ".webp",
            "audio/mpeg" => ".mp3",
            "audio/mp3" => ".mp3",
            _ => Path.GetExtension(new Uri(url).AbsolutePath) is { Length: > 1 } e ? e : null
        };
    }
}