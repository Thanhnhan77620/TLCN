using ExamToeicOnline_FrontEnd_Clients.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace ExamToeicOnline_BackEnd_Clients.EF
{
    public static class ModelBuilderExtension
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            DateTime dateTime = DateTime.Now;
            var id1 = Guid.NewGuid();
            var id2 = Guid.NewGuid();
            modelBuilder.Entity<User>().HasData(
               new User()
               {
                   Id = id1,
                   Fullname = "Nguyễn Thanh Nhân",
                   Email = "nhan@gmail.com",
                   Phonenumber = 12345678,
                   Birthday = new DateTime(1999 / 29 / 5)

               },
               new User()
               {
                   Id = id2,
                   Fullname = "Đỗ Thị Thanh Ngân",
                   Email = "ngan@gmail.com",
                   Phonenumber = 98765432,
                   Birthday=new DateTime(1999/29/11)
               }
            );
            modelBuilder.Entity<Account>().HasData(
              new Account()
              {
                  Id=1,
                  Username="ngan",
                  Password = BC.HashPassword("98765432"),
                  isActive=true,
                  isAdmin=false,
                  CreateAt= dateTime,
                  UserId =id1
              },
              new Account()
              {
                  Id = 2,
                  Username = "nhan",
                  Password = BC.HashPassword("12345678"),
                  isActive = true,
                  isAdmin = false,
                  CreateAt = dateTime,
                  UserId = id2
              }
          );
        }
    }
}
