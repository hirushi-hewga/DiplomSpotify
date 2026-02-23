using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SpotifyAPI.DAL.Configurations;

public class Track : IEntityTypeConfiguration<Entities.Track>
{
    public void Configure(EntityTypeBuilder<Entities.Track> builder)
    {
        builder.ToTable("Tracks");

        builder.Property(a => a.Name)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(a => a.Duration)
            .IsRequired();

        builder.Property(a => a.Path)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(a => a.Image)
            .HasMaxLength(255)
            .IsRequired();
    }
}