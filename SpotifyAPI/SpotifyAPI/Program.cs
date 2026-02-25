using System.Text;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SpotifyAPI.BLL;
using SpotifyAPI.BLL.DTOs.Account;
using SpotifyAPI.DAL;
using SpotifyAPI.DAL.Entities;
using SpotifyAPI.DataInitializer;
using SpotifyAPI.BLL.MapperProfiles;
using SpotifyAPI.BLL.Services;
using SpotifyAPI.BLL.Services.Image;
using SpotifyAPI.DAL.Repositories.Jwt;
using SpotifyAPI.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add jwt
builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]))
        };
        /*
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            RequireExpirationTime = true,
            ValidateIssuerSigningKey = true,
            // ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            // ValidAudience = builder.Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"] ?? "")),
            ClockSkew = TimeSpan.Zero
        };
        */
    });

// Add services to the container.
builder.Services.AddServices();

// Add repositories
builder.Services.AddScoped<IJwtRepository, JwtRepository>();

builder.Services.AddControllers();

// Add fluent validation
builder.Services.AddValidatorsFromAssemblyContaining<LoginValidator>();

// Add automapper
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<RoleMapperProfile>();
    cfg.AddProfile<UserMapperProfile>();
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Spotify API",
        Version = "v1"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Введи JWT токен у форматі: Bearer {your token}"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});


// Add database context
var assemblyName = AssemblyService.GetAssemblyName();

builder.Services.AddDbContext<AppDbContext>(
    options => {
        options.UseNpgsql(
            builder.Configuration.GetConnectionString("Npgsql"),
            npgsqlOptions => npgsqlOptions.MigrationsAssembly(assemblyName)
        );
        
        
        options.EnableSensitiveDataLogging(false);
        options.EnableDetailedErrors(false);
        
        
        if (builder.Environment.IsDevelopment())
        {
            options.EnableSensitiveDataLogging();
        }
    }
);

// Add identity
builder.Services
    .AddIdentity<AppUser, AppRole>(options =>
    {
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequiredUniqueChars = 0;
        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireLowercase = true;
        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddCors(options =>
{
    options.AddPolicy("localhost5173", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.AddScoped(sp =>
    new JamendoSeedService(
        sp.GetRequiredService<AppDbContext>(),
        sp.GetRequiredService<IHttpClientFactory>(),
        sp.GetRequiredService<IFileService>(),
        clientId: builder.Configuration["Jamendo:ClientId"]!
    ));

builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

// Static files
var rootPath = Path.Combine(builder.Environment.ContentRootPath, "wwwroot");
var dataPath = Path.Combine(rootPath, Settings.StaticPath);

var artistsPath = Path.Combine(dataPath, Settings.ArtistsPath);
var avatarsPath = Path.Combine(dataPath, Settings.AvatarsPath);
var playlistsPath = Path.Combine(dataPath, Settings.PlaylistsPath);
var albumsPath = Path.Combine(dataPath, Settings.AlbumsPath);
var genresPath = Path.Combine(dataPath, Settings.GenresPath);

var tracksPath = Path.Combine(dataPath, Settings.TracksPath);
var trackCoversPath = Path.Combine(dataPath, Settings.TrackCoversPath);

Directory.CreateDirectory(rootPath);
Directory.CreateDirectory(dataPath);
Directory.CreateDirectory(artistsPath);
Directory.CreateDirectory(avatarsPath);
Directory.CreateDirectory(playlistsPath);
Directory.CreateDirectory(albumsPath);
Directory.CreateDirectory(genresPath);
Directory.CreateDirectory(tracksPath);
Directory.CreateDirectory(trackCoversPath);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(dataPath),
    RequestPath = "/data"
});

app.UseCors("localhost5173");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await Seeder.SeedAsync(services);
}

app.Run();
