using ExamToeicOnline_FrontEnd_Clients.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Models
{
    public class DoExam
    {
        public int Id { get; set; }
        public DateTime dateStart { get; set; }
        public int Score { get; set; }
        public DateTime Effort { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ExamId { get; set; }
        public Exam Exam { get; set; }


    }
}
