using ExamToeicOnline_BackEnd_Clients.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_FrontEnd_Clients.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Birthday { get; set; }
        public string Image { get; set; }
        public ICollection<Account> Accounts { get; set; }
        public ICollection<DoExam> DoExams { get; set; }
    }
}
