using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SpotifyAPI.DAL.Configurations;

public class Album : IEntityTypeConfiguration<Entities.Album>
{
    public void Configure(EntityTypeBuilder<Entities.Album> builder)
    {
        builder.ToTable("Albums");

        builder.Property(a => a.Name)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(a => a.ReleaseDate)
            .HasColumnType("date")
            .IsRequired();

        builder.Property(a => a.Image)
            .HasMaxLength(255)
            .IsRequired();
    }
}