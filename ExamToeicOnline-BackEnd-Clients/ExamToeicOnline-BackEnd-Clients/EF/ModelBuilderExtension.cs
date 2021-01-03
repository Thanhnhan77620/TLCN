using ExamToeicOnline_BackEnd_Clients.Models;
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
            DateTime dateTime=DateTime.Now;
            var id1 = Guid.NewGuid();
            var id2 = Guid.NewGuid();
            modelBuilder.Entity<User>().HasData(
               new User()
               {
                   Id = id1,
                   Fullname = "Nguyễn Thanh Nhân",
                   Email = "nhan@gmail.com",
                   PhoneNumber = "12345678",
                   Birthday =DateTime.Parse("05/29/1999")

               },
               new User()
               {
                   Id = id2,
                   Fullname = "Đỗ Thị Thanh Ngân",
                   Email = "ngan@gmail.com",
                   PhoneNumber = "98765432",
                   Birthday = DateTime.Parse("11/29/1999")
               }
            );
            modelBuilder.Entity<Account>().HasData(
              new Account()
              {
                  Id = 1,
                  Username = "ngan",
                  Password = BC.HashPassword("12345678"),
                  isActive = true,
                  isAdmin = false,
                  CreateAt = dateTime,
                  UserId = id2
              },
              new Account()
              {
                  Id = 2,
                  Username = "nhan",
                  Password = BC.HashPassword("12345678"),
                  isActive = true,
                  isAdmin = false,
                  CreateAt = dateTime,
                  UserId = id1
              }
          );
           

        }
    }
}
