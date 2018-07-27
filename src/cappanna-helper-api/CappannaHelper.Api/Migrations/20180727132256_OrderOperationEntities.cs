using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CappannaHelper.Api.Migrations
{
    public partial class OrderOperationEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OperationTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChOrderOperations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OperationTimestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    OrderId = table.Column<int>(nullable: false),
                    TypeId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChOrderOperations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChOrderOperations_ChOrders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "ChOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChOrderOperations_OperationTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "OperationTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChOrderOperations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChOrderOperations_OrderId",
                table: "ChOrderOperations",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_ChOrderOperations_TypeId",
                table: "ChOrderOperations",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ChOrderOperations_UserId",
                table: "ChOrderOperations",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChOrderOperations");

            migrationBuilder.DropTable(
                name: "OperationTypes");
        }
    }
}
