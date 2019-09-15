using Microsoft.EntityFrameworkCore.Migrations;

namespace CappannaHelper.Api.Migrations
{
    public partial class StandsManagement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ChOrders_ShiftId_ShiftCounter",
                table: "ChOrders");

            migrationBuilder.AddColumn<int>(
                name: "SettingsId",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StandId",
                table: "ChOrders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Stands",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    PrintLabel = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserSettings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StandId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSettings", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_SettingsId",
                table: "Users",
                column: "SettingsId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChOrders_StandId",
                table: "ChOrders",
                column: "StandId");

            migrationBuilder.CreateIndex(
                name: "IX_ChOrders_ShiftId_ShiftCounter_StandId",
                table: "ChOrders",
                columns: new[] { "ShiftId", "ShiftCounter", "StandId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stands_Description",
                table: "Stands",
                column: "Description",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ChOrders_Stands_StandId",
                table: "ChOrders",
                column: "StandId",
                principalTable: "Stands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_UserSettings_SettingsId",
                table: "Users",
                column: "SettingsId",
                principalTable: "UserSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChOrders_Stands_StandId",
                table: "ChOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_UserSettings_SettingsId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Stands");

            migrationBuilder.DropTable(
                name: "UserSettings");

            migrationBuilder.DropIndex(
                name: "IX_Users_SettingsId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_ChOrders_StandId",
                table: "ChOrders");

            migrationBuilder.DropIndex(
                name: "IX_ChOrders_ShiftId_ShiftCounter_StandId",
                table: "ChOrders");

            migrationBuilder.DropColumn(
                name: "SettingsId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "StandId",
                table: "ChOrders");

            migrationBuilder.CreateIndex(
                name: "IX_ChOrders_ShiftId_ShiftCounter",
                table: "ChOrders",
                columns: new[] { "ShiftId", "ShiftCounter" },
                unique: true);
        }
    }
}
