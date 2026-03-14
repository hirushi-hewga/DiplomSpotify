using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SpotifyAPI.DAL.Configurations;

public class AlbumLike : IEntityTypeConfiguration<Entities.AlbumLike>
{
    public void Configure(EntityTypeBuilder<Entities.AlbumLike> builder)
    {
        builder.ToTable("AlbumLikes");

        builder.HasKey(f => new
        {
            f.UserId,
            f.AlbumId
        });

        builder.Property(a => a.LikeDate)
            .HasConversion(
                v => v.ToUniversalTime(),
                v => DateTime.SpecifyKind(v, DateTimeKind.Utc))
            .IsRequired();
    }
}