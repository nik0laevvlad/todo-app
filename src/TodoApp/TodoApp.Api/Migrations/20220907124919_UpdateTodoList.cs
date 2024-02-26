using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApp.Api.Migrations
{
    public partial class UpdateTodoList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoItems_TodoLists_ParentId",
                table: "TodoItems");

            migrationBuilder.RenameColumn(
                name: "ParentId",
                table: "TodoItems",
                newName: "ListId");

            migrationBuilder.RenameIndex(
                name: "IX_TodoItems_ParentId",
                table: "TodoItems",
                newName: "IX_TodoItems_ListId");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoItems_TodoLists_ListId",
                table: "TodoItems",
                column: "ListId",
                principalTable: "TodoLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoItems_TodoLists_ListId",
                table: "TodoItems");

            migrationBuilder.RenameColumn(
                name: "ListId",
                table: "TodoItems",
                newName: "ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_TodoItems_ListId",
                table: "TodoItems",
                newName: "IX_TodoItems_ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoItems_TodoLists_ParentId",
                table: "TodoItems",
                column: "ParentId",
                principalTable: "TodoLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
