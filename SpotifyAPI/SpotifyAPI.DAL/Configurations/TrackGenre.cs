using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SpotifyAPI.DAL.Configurations;

public class TrackGenre : IEntityTypeConfiguration<Entities.TrackGenre>
{
    public void Configure(EntityTypeBuilder<Entities.TrackGenre> builder)
    {
        builder.ToTable("TrackGenre");

        builder.HasKey(pt => new
        {
            pt.TrackId,
            pt.GenreId
        });
    }
}