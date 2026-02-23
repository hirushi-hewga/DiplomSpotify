namespace SpotifyAPI.BLL.Services.Email;

public class Message
{
    public string To { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Body { get; set; } = null!;
}