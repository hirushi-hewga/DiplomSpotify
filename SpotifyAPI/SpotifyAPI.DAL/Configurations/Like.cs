using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SpotifyAPI.DAL.Configurations;

public class Like : IEntityTypeConfiguration<Entities.Like>
{
    public void Configure(EntityTypeBuilder<Entities.Like> builder)
    {
        builder.ToTable("Like");

        builder.HasKey(f => new
        {
            f.UserId,
            f.TrackId
        });

        builder.Property(a => a.LikeDate)
            .HasConversion(
                v => v.ToUniversalTime(),
                v => DateTime.SpecifyKind(v, DateTimeKind.Utc))
            .IsRequired();
    }
}