using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExamToeicOnline_BackEnd_Clients.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Fullname = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Phonenumber = table.Column<int>(nullable: false),
                    Birthday = table.Column<DateTime>(nullable: false),
                    Image = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    isActive = table.Column<bool>(nullable: false),
                    isAdmin = table.Column<bool>(nullable: false),
                    CreateAt = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accounts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Birthday", "Email", "Fullname", "Image", "Phonenumber" },
                values: new object[] { new Guid("89d32ef1-3060-4fdc-bb4d-bca763d11aa7"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified).AddTicks(13), "nhan@gmail.com", "Nguyễn Thanh Nhân", null, 12345678 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Birthday", "Email", "Fullname", "Image", "Phonenumber" },
                values: new object[] { new Guid("aeb398b2-4af3-473c-b056-cf4fd8c2bcc2"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified).AddTicks(6), "ngan@gmail.com", "Đỗ Thị Thanh Ngân", null, 98765432 });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "CreateAt", "Password", "UserId", "Username", "isActive", "isAdmin" },
                values: new object[] { 1, new DateTime(2020, 11, 8, 12, 44, 37, 992, DateTimeKind.Local).AddTicks(8906), "$2a$11$ZE4f.CSMx8Rb2lPSAgU48uABSDUHxmgrMo0eAi9qBM6NVXuZyqzJu", new Guid("89d32ef1-3060-4fdc-bb4d-bca763d11aa7"), "ngan", true, false });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "CreateAt", "Password", "UserId", "Username", "isActive", "isAdmin" },
                values: new object[] { 2, new DateTime(2020, 11, 8, 12, 44, 37, 992, DateTimeKind.Local).AddTicks(8906), "$2a$11$.GaiHUOKez2L9GcQdXFlEerXctLAJsomtsV8psjIhgyzlgZDSHgty", new Guid("aeb398b2-4af3-473c-b056-cf4fd8c2bcc2"), "nhan", true, false });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_UserId",
                table: "Accounts",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
