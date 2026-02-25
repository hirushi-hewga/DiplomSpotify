using Quartz;
using SpotifyAPI.BLL.Services.Account;
using SpotifyAPI.BLL.Services.Artist;
using SpotifyAPI.BLL.Services.Email;
using SpotifyAPI.BLL.Services.Image;
using SpotifyAPI.BLL.Services.Jwt;
using SpotifyAPI.BLL.Services.Role;
using SpotifyAPI.BLL.Services.User;
using SpotifyAPI.DAL;
using SpotifyAPI.DataInitializer;

namespace SpotifyAPI.Infrastructure
{
    public static class DependencyInjection
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IArtistService, ArtistService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IJwtService, JwtService>();
        }

        public static void AddJobs(this IServiceCollection services, params (Type type, string cronExpression)[] jobs)
        {
            services.AddQuartz(q =>
            {
                foreach (var job in jobs)
                {
                    var jobKey = new JobKey(job.type.Name);
                    q.AddJob(job.type, jobKey, opt => { });

                    q.AddTrigger(opt => opt
                        .ForJob(jobKey)
                        .WithIdentity($"{job.type.Name}-trigger")
                        .WithCronSchedule(job.cronExpression));
                }
            });
        }
    }
}