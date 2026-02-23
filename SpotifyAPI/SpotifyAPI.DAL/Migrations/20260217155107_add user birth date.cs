using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpotifyAPI.DAL.Migrations
{
    /// <inheritdoc />
    public partial class adduserbirthdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateOfBirth",
                table: "AspNetUsers",
                newName: "BirthDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BirthDate",
                table: "AspNetUsers",
                newName: "DateOfBirth");
        }
    }
}
