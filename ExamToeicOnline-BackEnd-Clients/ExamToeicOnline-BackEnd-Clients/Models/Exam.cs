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
        public int Duration { get; set; }
        public ICollection<DoExam> DoExams { get; set; }      
        public ICollection<Question> Questions { get; set; }
        public ICollection<GroupQuestion> GroupQuestions { get; set; }


    }
}
