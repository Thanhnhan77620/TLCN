﻿// <auto-generated />
using System;
using ExamToeicOnline_BackEnd_Clients.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ExamToeicOnline_BackEnd_Clients.Migrations
{
    [DbContext(typeof(ExamToeicOnlineDBContext))]
    [Migration("20201219023232_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<int>("ExamId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FinishedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("ExamId");

                    b.HasIndex("UserId");

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

                    b.Property<int>("ExamId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ExamId");

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
                            CreateAt = new DateTime(2020, 12, 19, 9, 32, 31, 240, DateTimeKind.Local).AddTicks(9659),
                            Password = "$2a$11$riekDL/SQ5MT.8jFbAr1GuJmaV4dEYwWNZo7eCmu1Yxp3GcyYu1m2",
                            UserId = new Guid("c9108224-2ec7-4b24-986a-05454fcb0b9d"),
                            Username = "ngan",
                            isActive = true,
                            isAdmin = false
                        },
                        new
                        {
                            Id = 2,
                            CreateAt = new DateTime(2020, 12, 19, 9, 32, 31, 240, DateTimeKind.Local).AddTicks(9659),
                            Password = "$2a$11$NHSpmo4XunWgvD9Emek3PuCnZiszGQlswa.66UdnGNlQwY1Vhb9rS",
                            UserId = new Guid("6b2c5e8a-9335-493d-8606-c6e2cd42e5f3"),
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

                    b.Property<DateTime?>("Birthday")
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
                            Id = new Guid("c9108224-2ec7-4b24-986a-05454fcb0b9d"),
                            Birthday = new DateTime(1999, 5, 29, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "nhan@gmail.com",
                            Fullname = "Nguyễn Thanh Nhân",
                            PhoneNumber = "12345678"
                        },
                        new
                        {
                            Id = new Guid("6b2c5e8a-9335-493d-8606-c6e2cd42e5f3"),
                            Birthday = new DateTime(1999, 11, 29, 0, 0, 0, 0, DateTimeKind.Unspecified),
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
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.FileAudio", b =>
                {
                    b.HasOne("ExamToeicOnline_BackEnd_Clients.Models.GroupQuestion", "GroupQuestion")
                        .WithMany("FileAudios")
                        .HasForeignKey("GroupQuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ExamToeicOnline_BackEnd_Clients.Models.GroupQuestion", b =>
                {
                    b.HasOne("ExamToeicOnline_BackEnd_Clients.Models.Exam", "Exam")
                        .WithMany("GroupQuestions")
                        .HasForeignKey("ExamId")
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