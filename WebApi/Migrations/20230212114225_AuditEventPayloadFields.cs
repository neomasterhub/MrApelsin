using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    public partial class AuditEventPayloadFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Object",
                schema: "mr.apelsin",
                table: "AuditEvent",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Subject",
                schema: "mr.apelsin",
                table: "AuditEvent",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Object",
                schema: "mr.apelsin",
                table: "AuditEvent");

            migrationBuilder.DropColumn(
                name: "Subject",
                schema: "mr.apelsin",
                table: "AuditEvent");
        }
    }
}
