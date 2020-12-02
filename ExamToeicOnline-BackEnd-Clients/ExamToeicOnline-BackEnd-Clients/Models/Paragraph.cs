using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Models
{
    public class Paragraph
    {
        public int Id { get; set; }
        public string image_Script { get; set; }
        public int GroupQuestionId { get; set; }
        public GroupQuestion GroupQuestion { get; set; }
    }
}
