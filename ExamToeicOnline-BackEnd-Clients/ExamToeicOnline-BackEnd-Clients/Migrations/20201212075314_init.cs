using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExamToeicOnline_BackEnd_Clients.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Exams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Duration = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exams", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GroupQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupQuestions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Fullname = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Birthday = table.Column<DateTime>(nullable: true),
                    Image = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FileAudios",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    file_Audio = table.Column<string>(nullable: true),
                    GroupQuestionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileAudios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FileAudios_GroupQuestions_GroupQuestionId",
                        column: x => x.GroupQuestionId,
                        principalTable: "GroupQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Paragraphs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    image_Script = table.Column<string>(nullable: true),
                    GroupQuestionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paragraphs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Paragraphs_GroupQuestions_GroupQuestionId",
                        column: x => x.GroupQuestionId,
                        principalTable: "GroupQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    PartName = table.Column<string>(nullable: true),
                    GroupQuestionId = table.Column<int>(nullable: false),
                    ExamId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_Exams_ExamId",
                        column: x => x.ExamId,
                        principalTable: "Exams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Questions_GroupQuestions_GroupQuestionId",
                        column: x => x.GroupQuestionId,
                        principalTable: "GroupQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.CreateTable(
                name: "DoExams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    dateStart = table.Column<DateTime>(nullable: false),
                    Score = table.Column<int>(nullable: false),
                    Effort = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    UserId1 = table.Column<Guid>(nullable: true),
                    ExamId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoExams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoExams_Exams_ExamId",
                        column: x => x.ExamId,
                        principalTable: "Exams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DoExams_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Anwsers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(nullable: true),
                    Correct = table.Column<bool>(nullable: false),
                    QuestionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Anwsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Anwsers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Birthday", "Email", "Fullname", "Image", "PhoneNumber" },
                values: new object[] { new Guid("c838c44d-6187-4854-a84f-a877abdd4b02"), new DateTime(1999, 5, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "nhan@gmail.com", "Nguyễn Thanh Nhân", null, "12345678" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Birthday", "Email", "Fullname", "Image", "PhoneNumber" },
                values: new object[] { new Guid("62174b6b-0e79-4d10-873d-4c8d3082bd95"), new DateTime(1999, 11, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "ngan@gmail.com", "Đỗ Thị Thanh Ngân", null, "98765432" });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "CreateAt", "Password", "UserId", "Username", "isActive", "isAdmin" },
                values: new object[] { 1, new DateTime(2020, 12, 12, 14, 53, 14, 76, DateTimeKind.Local).AddTicks(5146), "$2a$11$3//uC79oAiOxb8S7dIowle.bsQ3ToJPgRwxknDhN0FnYUhe5uVWB.", new Guid("c838c44d-6187-4854-a84f-a877abdd4b02"), "ngan", true, false });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "CreateAt", "Password", "UserId", "Username", "isActive", "isAdmin" },
                values: new object[] { 2, new DateTime(2020, 12, 12, 14, 53, 14, 76, DateTimeKind.Local).AddTicks(5146), "$2a$11$K.4fiRwEQpa81F7qvcQX/.FVFYnoj31rrFYlCVBtkZAsPPbb4xScy", new Guid("62174b6b-0e79-4d10-873d-4c8d3082bd95"), "nhan", true, false });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_UserId",
                table: "Accounts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Anwsers_QuestionId",
                table: "Anwsers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_DoExams_ExamId",
                table: "DoExams",
                column: "ExamId");

            migrationBuilder.CreateIndex(
                name: "IX_DoExams_UserId1",
                table: "DoExams",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_FileAudios_GroupQuestionId",
                table: "FileAudios",
                column: "GroupQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Paragraphs_GroupQuestionId",
                table: "Paragraphs",
                column: "GroupQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ExamId",
                table: "Questions",
                column: "ExamId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_GroupQuestionId",
                table: "Questions",
                column: "GroupQuestionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Anwsers");

            migrationBuilder.DropTable(
                name: "DoExams");

            migrationBuilder.DropTable(
                name: "FileAudios");

            migrationBuilder.DropTable(
                name: "Paragraphs");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Exams");

            migrationBuilder.DropTable(
                name: "GroupQuestions");
        }
    }
}
