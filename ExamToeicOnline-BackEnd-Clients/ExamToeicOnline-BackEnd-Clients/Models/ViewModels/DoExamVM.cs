using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Models.ViewModels
{
    public class DoExamVM
    {
        public DateTime StartedAt { get; set; }
        public DateTime FinishedAt { get; set; }
        public int ScoreListening { get; set; }
        public int ScoreReading { get; set; }
        public Guid UserId { get; set; }
        public int ExamId { get; set; }
    }
}
