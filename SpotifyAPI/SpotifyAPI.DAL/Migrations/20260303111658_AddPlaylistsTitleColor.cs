using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpotifyAPI.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddPlaylistsTitleColor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsBlackTitle",
                table: "Playlists",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsBlackTitle",
                table: "Playlists");
        }
    }
}
