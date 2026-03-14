using Microsoft.AspNetCore.Identity;
using SpotifyAPI.BLL;
using SpotifyAPI.DAL.Entities;

namespace SpotifyAPI.DataInitializer
{
    public class Seeder
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<AppRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();

            if (await roleManager.FindByNameAsync(Settings.AdminRole) == null)
                await roleManager.CreateAsync(new AppRole{ Name = Settings.AdminRole });
            
            if (await roleManager.FindByNameAsync(Settings.UserRole) == null)
                await roleManager.CreateAsync(new AppRole{ Name = Settings.UserRole });

            if (await userManager.FindByNameAsync("admin") == null)
            {
                var user = new AppUser
                {
                    UserName = "admin",
                    Email = "admin@gmail.com",
                    EmailConfirmed = true
                };
                
                var res = await userManager.CreateAsync(user, "Admin123");
                if (!res.Succeeded)
                    throw new Exception(string.Join("; ", res.Errors.Select(e => e.Description)));
                await userManager.AddToRoleAsync(user, Settings.AdminRole);
            }

            if (await userManager.FindByNameAsync("user") == null)
            {
                var user = new AppUser
                {
                    UserName = "user",
                    Email = "user@gmail.com",
                    EmailConfirmed = true
                };
                
                var res = await userManager.CreateAsync(user, "User1234");
                if (!res.Succeeded)
                    throw new Exception(string.Join("; ", res.Errors.Select(e => e.Description)));
                await userManager.AddToRoleAsync(user, Settings.UserRole);
            }
        }
    }
}