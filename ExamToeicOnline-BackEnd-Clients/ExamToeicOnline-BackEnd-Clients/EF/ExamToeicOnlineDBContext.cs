using ExamToeicOnline_FrontEnd_Clients.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;


namespace ExamToeicOnline_BackEnd_Clients.EF
{
    public class ExamToeicOnlineDBContext : DbContext
    {
      
        public ExamToeicOnlineDBContext(DbContextOptions options) : base(options)
        {
           
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //   optionsBuilder.UseSqlServer("Server =.; Database = ExamToeicOnlineDb; Trusted_Connection = True;");

        //}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Seed data
            modelBuilder.Seed();
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
