using System.Net;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;

namespace SpotifyAPI.BLL.Services.Email
{
    public class EmailService(
        IOptions<EmailConfiguration> options
    ) : IEmailService
    {
        private readonly EmailConfiguration emailConfiguration = options.Value;
        public async Task SendAsync(Message messageData)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("EchoMail", emailConfiguration.From));
            message.To.Add(new MailboxAddress(messageData.Name, messageData.To));
            message.Subject = "Reset Password";

            message.Body = new TextPart("html")
            {
                Text = messageData.Body
            };

            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(emailConfiguration.SmtpServer, emailConfiguration.Port, SecureSocketOptions.SslOnConnect);
                    await client.AuthenticateAsync(emailConfiguration.UserName, emailConfiguration.Password);
                    await client.SendAsync(message);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error sending: " + ex);
                }
                finally
                {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
            }
        }
    }
}