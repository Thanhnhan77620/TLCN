using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Models
{
    public class Part
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Direction { get; set; }
        public byte[] FilMP3 { get; set; }
        public int ExamId { get; set; }
        public Exam Exam { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}
