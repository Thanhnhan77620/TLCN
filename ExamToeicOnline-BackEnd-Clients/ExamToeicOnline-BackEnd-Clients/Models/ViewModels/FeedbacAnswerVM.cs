using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Models.ViewModels
{
    public class FeedbacAnswerVM
    {
        public Guid UserId { get; set; }
        public int ExamId { get; set; }
        public double StartedAt { get; set; }
        public double FinishedAt { get; set; }
        public List<AnswerSelectVM> answerSelectVMs{ get; set; }
    }
}
