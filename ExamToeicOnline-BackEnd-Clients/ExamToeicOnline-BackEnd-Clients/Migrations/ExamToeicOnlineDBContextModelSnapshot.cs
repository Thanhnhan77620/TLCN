﻿// <auto-generated />
using System;
using ExamToeicOnline_BackEnd_Clients.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ExamToeicOnline_BackEnd_Clients.Migrations
{
    [DbContext(typeof(ExamToeicOnlineDBContext))]
    partial class ExamToeicOnlineDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.Anwser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Correct")
                        .HasColumnType("bit");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("Anwsers");
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.DoExam", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Effort")
                        .HasColumnType("datetime2");

                    b.Property<int>("ExamId")
                        .HasColumnType("int");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<Guid?>("UserId1")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("dateStart")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ExamId");

                    b.HasIndex("UserId1");

                    b.ToTable("DoExams");
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.Exam", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Exams");
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.FileAudio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("GroupQuestionId")
                        .HasColumnType("int");

                    b.Property<string>("file_Audio")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GroupQuestionId");

                    b.ToTable("FileAudios");
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.GroupQuestion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.HasKey("Id");

                    b.ToTable("GroupQuestions");
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.Paragraph", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("GroupQuestionId")
                        .HasColumnType("int");

                    b.Property<string>("image_Script")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GroupQuestionId");

                    b.ToTable("Paragraphs");
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ExamId")
                        .HasColumnType("int");

                    b.Property<int>("GroupQuestionId")
                        .HasColumnType("int");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PartName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ExamId");

                    b.HasIndex("GroupQuestionId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("ExamToeicOnline_FrontEnd_Clients.Models.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isActive")
                        .HasColumnType("bit");

                    b.Property<bool>("isAdmin")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Accounts");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreateAt = new DateTime(2020, 12, 2, 12, 35, 37, 809, DateTimeKind.Local).AddTicks(9866),
                            Password = "$2a$11$D9UgIDZFQMYRAQbS8zD8a.HsnVvM2Z0KyrxLnXaYP0GVxnOfdf9k.",
                            UserId = new Guid("dc10c757-e876-4c48-b846-b134f4dbf0cd"),
                            Username = "ngan",
                            isActive = true,
                            isAdmin = false
                        },
                        new
                        {
                            Id = 2,
                            CreateAt = new DateTime(2020, 12, 2, 12, 35, 37, 809, DateTimeKind.Local).AddTicks(9866),
                            Password = "$2a$11$8a6BTCFsA0rtvk1GM9QkWe3oGtf2r/XC68dIRHXGxQ9W2OVCq8SUG",
                            UserId = new Guid("b6685512-70fb-4e70-a9c5-b57cbb857294"),
                            Username = "nhan",
                            isActive = true,
                            isAdmin = false
                        });
                });

            modelBuilder.Entity("ExamToeicOnline_FrontEnd_Clients.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fullname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("dc10c757-e876-4c48-b846-b134f4dbf0cd"),
                            Birthday = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified).AddTicks(13),
                            Email = "nhan@gmail.com",
                            Fullname = "Nguyễn Thanh Nhân",
                            PhoneNumber = "12345678"
                        },
                        new
                        {
                            Id = new Guid("b6685512-70fb-4e70-a9c5-b57cbb857294"),
                            Birthday = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified).AddTicks(6),
                            Email = "ngan@gmail.com",
                            Fullname = "Đỗ Thị Thanh Ngân",
                            PhoneNumber = "98765432"
                        });
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.Anwser", b =>
                {
                    b.HasOne("ExamToeicOnline_BackEnd_Clients.Models.Question", "Question")
                        .WithMany("Anwsers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.DoExam", b =>
                {
                    b.HasOne("ExamToeicOnline_BackEnd_Clients.Models.Exam", "Exam")
                        .WithMany("DoExams")
                        .HasForeignKey("ExamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExamToeicOnline_FrontEnd_Clients.Models.User", "User")
                        .WithMany("DoExams")
                        .HasForeignKey("UserId1");
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.FileAudio", b =>
                {
                    b.HasOne("ExamToeicOnline_BackEnd_Clients.Models.GroupQuestion", "GroupQuestion")
                        .WithMany("FileAudios")
                        .HasForeignKey("GroupQuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.Paragraph", b =>
                {
                    b.HasOne("ExamToeicOnline_BackEnd_Clients.Models.GroupQuestion", "GroupQuestion")
                        .WithMany("Paragraphs")
                        .HasForeignKey("GroupQuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.Question", b =>
                {
                    b.HasOne("ExamToeicOnline_BackEnd_Clients.Models.Exam", "Exam")
                        .WithMany("Questions")
                        .HasForeignKey("ExamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ExamToeicOnline_BackEnd_Clients.Models.GroupQuestion", "GroupQuestion")
                        .WithMany("Questions")
                        .HasForeignKey("GroupQuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ExamToeicOnline_FrontEnd_Clients.Models.Account", b =>
                {
                    b.HasOne("ExamToeicOnline_FrontEnd_Clients.Models.User", "User")
                        .WithMany("Accounts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
