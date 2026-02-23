using System.Net.Mail;

namespace SpotifyAPI.BLL.Services.Email
{
    public interface IEmailService
    {
        Task SendAsync(Message messageData);
    }
}