﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExamToeicOnline_BackEnd_Clients.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Fullname = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Phonenumber = table.Column<int>(nullable: false)
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
                columns: new[] { "Id", "Email", "Fullname", "Phonenumber" },
                values: new object[] { new Guid("cc48a3f4-2e3c-4055-bb34-3e8e8b515116"), "nhan@gmail.com", "Nguyễn Thanh Nhân", 12345678 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Fullname", "Phonenumber" },
                values: new object[] { new Guid("06c8803f-258d-402a-a362-e8af11225832"), "ngan@gmail.com", "Đỗ Thị Thanh Ngân", 98765432 });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "Password", "UserId", "Username", "isActive" },
                values: new object[] { 1, "98765432", new Guid("cc48a3f4-2e3c-4055-bb34-3e8e8b515116"), "ngan", true });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "Password", "UserId", "Username", "isActive" },
                values: new object[] { 2, "12345678", new Guid("06c8803f-258d-402a-a362-e8af11225832"), "nhan", true });

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
                name: "Users");
        }
    }
}
