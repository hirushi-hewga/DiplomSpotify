using System.Net;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace SpotifyAPI.BLL.Services.Image;

public class FileService : IFileService
{
    private readonly string _dataRoot;
    private readonly HttpClient _http;

    public FileService(IWebHostEnvironment env)
    {
        _dataRoot = Path.Combine(env.ContentRootPath, "wwwroot", Settings.StaticPath);

        var handler = new HttpClientHandler
        {
            AllowAutoRedirect = true,
            AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate | DecompressionMethods.Brotli
        };

        _http = new HttpClient(handler)
        {
            Timeout = TimeSpan.FromMinutes(5)
        };

        _http.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0");
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

    public async Task<string?> SaveImageFromUrlAsync(string url, string folder, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(url)) return null;

        using var res = await _http.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, ct);
        if (!res.IsSuccessStatusCode) return null;

        var contentType = res.Content.Headers.ContentType?.MediaType ?? "";
        if (!contentType.StartsWith("image/")) return null;

        var ext = GuessExt(contentType, url) ?? ".jpg";
        var name = $"{Guid.NewGuid()}{ext}";

        var dir = Path.Combine(_dataRoot, folder);
        Directory.CreateDirectory(dir);

        var path = Path.Combine(dir, name);
        await using var fs = File.Create(path);
        await res.Content.CopyToAsync(fs, ct);

        return $"{folder}/{name}";
    }

    public async Task<string?> SaveAudioFromUrlAsync(string url, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(url)) return null;

        using var res = await _http.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, ct);
        if (!res.IsSuccessStatusCode) return null;

        var contentType = res.Content.Headers.ContentType?.MediaType ?? "";

        if (!(contentType.StartsWith("audio/") || contentType == "application/octet-stream"))
            return null;

        var ext = ".mp3";
        var name = $"{Guid.NewGuid()}{ext}";

        var dir = Path.Combine(_dataRoot, Settings.TracksPath);
        Directory.CreateDirectory(dir);

        var path = Path.Combine(dir, name);
        await using var fs = File.Create(path);
        await res.Content.CopyToAsync(fs, ct);

        return $"{Settings.TracksPath}/{name}";
    }

    private static string? GuessExt(string contentType, string url)
    {
        // 1) from content-type
        return contentType switch
        {
            "image/jpeg" => ".jpg",
            "image/png" => ".png",
            "image/webp" => ".webp",
            "image/gif" => ".gif",
            "audio/mpeg" => ".mp3",
            "audio/mp3" => ".mp3",
            "audio/wav" => ".wav",
            "audio/x-wav" => ".wav",
            "audio/ogg" => ".ogg",
            _ => Path.GetExtension(url).Length >= 2 ? Path.GetExtension(url) : null
        };
    }

    public void Delete(string relativePath)
    {
        var fullPath = Path.Combine(_dataRoot, relativePath);
        if (File.Exists(fullPath))
            File.Delete(fullPath);
    }
}