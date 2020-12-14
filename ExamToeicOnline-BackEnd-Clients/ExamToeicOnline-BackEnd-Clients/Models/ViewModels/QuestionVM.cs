using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Models.ViewModels
{
    public class QuestionVM
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public string FileAudio { get; set; }
        public int GroupQuestionId { get; set; }
        public string ImageGroup { get; set; }
        public Anwser anwsers { get; set; }
    }
}
