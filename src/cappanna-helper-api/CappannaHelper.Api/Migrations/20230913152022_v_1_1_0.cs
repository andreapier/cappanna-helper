using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CappannaHelper.Api.Migrations
{
    /// <inheritdoc />
    public partial class v_1_1_0 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChOrderOperations_OperationTypes_TypeId",
                table: "ChOrderOperations");

            migrationBuilder.DropTable(
                name: "OperationTypes");

            migrationBuilder.DropIndex(
                name: "IX_ChOrderOperations_TypeId",
                table: "ChOrderOperations");

            migrationBuilder.RenameColumn(
                name: "TypeId",
                table: "ChOrderOperations",
                newName: "Type");

            migrationBuilder.AlterColumn<double>(
                name: "Income",
                table: "Shifts",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(decimal),
                oldType: "TEXT",
                oldDefaultValue: 0m);

            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "MenuDetails",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "Customer",
                table: "ChOrders",
                type: "TEXT",
                maxLength: 500,
                nullable: false,
                defaultValue: "NA");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Customer",
                table: "ChOrders");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "ChOrderOperations",
                newName: "TypeId");

            migrationBuilder.AlterColumn<decimal>(
                name: "Income",
                table: "Shifts",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(double),
                oldType: "REAL",
                oldDefaultValue: 0.0);

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "MenuDetails",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.CreateTable(
                name: "OperationTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChOrderOperations_TypeId",
                table: "ChOrderOperations",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChOrderOperations_OperationTypes_TypeId",
                table: "ChOrderOperations",
                column: "TypeId",
                principalTable: "OperationTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
