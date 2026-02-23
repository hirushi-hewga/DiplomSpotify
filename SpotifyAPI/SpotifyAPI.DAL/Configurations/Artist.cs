using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SpotifyAPI.DAL.Configurations;

public class Artist : IEntityTypeConfiguration<Entities.Artist>
{
    public void Configure(EntityTypeBuilder<Entities.Artist> builder)
    {
        builder.ToTable("Artists");

        builder.Property(a => a.Name)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(a => a.Image)
            .HasMaxLength(255)
            .IsRequired();
    }
}