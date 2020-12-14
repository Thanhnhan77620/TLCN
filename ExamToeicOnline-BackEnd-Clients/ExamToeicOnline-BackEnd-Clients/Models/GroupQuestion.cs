using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Models
{
    public class GroupQuestion
    {
        public int Id { get; set; }  
        public ICollection<Question> Questions { get; set; }
        public ICollection<FileAudio> FileAudios { get; set; }
        public ICollection<Paragraph> Paragraphs { get; set; }
        public int ExamId { get; set; }
        public Exam Exam { get; set; }
    }
}
