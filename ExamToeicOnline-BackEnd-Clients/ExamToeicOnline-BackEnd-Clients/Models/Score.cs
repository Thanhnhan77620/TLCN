using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Models
{
    public class Score
    {
        public int Id { get; set; }
        public int numberQuestion { get; set; }
        public int ScoreLC { get; set; }
        public int ScoreRC { get; set; }
    }
}
