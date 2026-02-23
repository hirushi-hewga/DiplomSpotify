namespace SpotifyAPI.BLL;

public static class Settings
{
    // paths
    public static string FilesRootPath = string.Empty;
    public static string StaticPath = "data";

    public const string ArtistsPath = "artists";
    public const string AvatarsPath = "avatars";
    public const string PlaylistsPath = "playlists";
    public const string AlbumsPath = "albums";
    public const string GenresPath = "genres";
    public const string TracksPath = "tracks";
    public const string TrackCoversPath = "track-covers";
    // roles
    public const string AdminRole = "admin";
    public const string UserRole = "user";
    // pagination
    public const int PageSize = 10;
}