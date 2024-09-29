using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CappannaHelper.Api.Migrations
{
    /// <inheritdoc />
    public partial class v_1_2_0 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CloseTimestamp",
                table: "Shifts",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CloseTimestamp",
                table: "Shifts");
        }
    }
}
