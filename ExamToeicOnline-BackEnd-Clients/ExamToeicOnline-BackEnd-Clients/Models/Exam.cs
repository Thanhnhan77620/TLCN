using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Models
{
    public class Exam
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<Part> Parts { get; set; }

    }
}
