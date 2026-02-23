using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SpotifyAPI.DAL.Configurations;

public class PlaylistTrack : IEntityTypeConfiguration<Entities.PlaylistTrack>
{
    public void Configure(EntityTypeBuilder<Entities.PlaylistTrack> builder)
    {
        builder.ToTable("PlaylistTracks");

        builder.HasKey(pt => new
        {
            pt.PlaylistId,
            pt.TrackId
        });
    }
}