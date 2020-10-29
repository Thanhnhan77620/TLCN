using ExamToeicOnline_FrontEnd_Clients.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.EF
{
    public static class ModelBuilderExtension
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {

            var id1 = Guid.NewGuid();
            var id2 = Guid.NewGuid();
            modelBuilder.Entity<User>().HasData(
               new User()
               {
                   Id = id1,
                   Fullname = "Nguyễn Thanh Nhân",
                   Email = "nhan@gmail.com",
                   Phonenumber = 12345678
               },
               new User()
               {
                   Id = id2,
                   Fullname = "Đỗ Thị Thanh Ngân",
                   Email = "ngan@gmail.com",
                   Phonenumber = 98765432
               }
           );
            modelBuilder.Entity<Account>().HasData(
              new Account()
              {
                  Id=1,
                  Username="ngan",
                  Password= "98765432",
                  isActive=true,
                  UserId=id1
              },
              new Account()
              {
                  Id = 2,
                  Username = "nhan",
                  Password = "12345678",
                  isActive = true,
                    UserId = id2
              }
          );
        }
    }
}
