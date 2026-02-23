using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SpotifyAPI.DAL.Configurations;

public class Genre : IEntityTypeConfiguration<Entities.Genre>
{
    public void Configure(EntityTypeBuilder<Entities.Genre> builder)
    {
        builder.ToTable("Genres");

        builder.Property(g => g.Name)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(g => g.Name)
            .IsUnique();

        builder.Property(a => a.Image)
            .HasMaxLength(255)
            .IsRequired();
    }
}