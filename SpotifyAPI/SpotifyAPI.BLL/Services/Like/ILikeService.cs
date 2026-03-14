namespace SpotifyAPI.BLL.Services.Like;

public interface ILikeService
{
    Task<ServiceResponse> LikeAsync(string userId, string trackId);
}