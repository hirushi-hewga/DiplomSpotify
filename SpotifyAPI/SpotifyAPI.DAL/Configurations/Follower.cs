using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SpotifyAPI.DAL.Configurations;

public class Follower : IEntityTypeConfiguration<Entities.Follower>
{
    public void Configure(EntityTypeBuilder<Entities.Follower> builder)
    {
        builder.ToTable("Follower");

        builder.HasKey(f => new
        {
            f.UserId,
            f.ArtistId
        });
    }
}