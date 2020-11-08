using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_FrontEnd_Clients.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Boolean isActive { get; set; }
        public Boolean isAdmin { get; set; }
        public DateTime CreateAt { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
