using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SpotifyAPI.DAL.Configurations;

public class Playlist : IEntityTypeConfiguration<Entities.Playlist>
{
    public void Configure(EntityTypeBuilder<Entities.Playlist> builder)
    {
        builder.ToTable("Playlists");

        builder.Property(a => a.Title)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(a => a.Name)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(a => a.Image)
            .HasMaxLength(255)
            .IsRequired();
    }
}