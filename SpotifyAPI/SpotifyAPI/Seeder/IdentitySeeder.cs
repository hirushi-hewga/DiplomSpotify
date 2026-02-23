using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities.Identity;
using SpotifyAPI.Constants;
using SpotifyAPI.Seeder.Interfaces;
using SpotifyAPI.Services.Interfaces;

namespace SpotifyAPI.Seeder;

public class IdentitySeeder(
    DataContext context,
    UserManager<User> userManager,
    RoleManager<Role> roleManager,
    IImageService imageService,
    IConfiguration configuration
    ) : IIdentitySeeder
{

    public async Task SeedAsync()
    {
        using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            if (!await context.Roles.AnyAsync())
            {
                await CreateRolesAsync();
            }

            if (!await context.Users.AnyAsync())
            {
                await CreateAdminAsync();
            }

            await transaction.CommitAsync();
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    private async Task CreateRolesAsync()
    {
        foreach (var roleName in Roles.All)
        {
            await roleManager.CreateAsync(new Role
            {
                Name = roleName
            });
        }
    }

    private async Task CreateAdminAsync()
    {
        var user = new User
        {
            Name = "Admin",
            Email = configuration["Admin:Email"]
                ?? throw new NullReferenceException("Admin:Email"),
            UserName = "admin",
            BirthDate = DateTime.UtcNow,
        };

        IdentityResult result = await userManager.CreateAsync(
            user,
            configuration["Admin:Password"]
                ?? throw new NullReferenceException("Admin:Password")
        );

        if (!result.Succeeded)
            throw new Exception("Error creating admin account");

        result = await userManager.AddToRoleAsync(user, Roles.Admin);

        if (!result.Succeeded)
            throw new Exception("Role assignment error");
    }
}