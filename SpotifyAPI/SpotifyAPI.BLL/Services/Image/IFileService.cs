using Microsoft.AspNetCore.Http;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.BLL.Services.Image;

public interface IFileService
{
    Task<string?> SaveImageFromUrlAsync(string url, string folder, CancellationToken ct = default);
    Task<string?> SaveAudioFromUrlAsync(string url, CancellationToken ct = default);
    Task<string?> SaveImageAsync(IFormFile file, string folder);
    Task<string?> SaveAudioAsync(IFormFile file);
    void Delete(string relativePath);
}