using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public string PartName { get; set; }
        public int GroupQuestionId { get; set; }
        public GroupQuestion GroupQuestion { get; set; }
        public int ExamId { get; set; }
        public Exam Exam { get; set; }
        public ICollection<Anwser> Anwsers { get; set; }
    }
}
