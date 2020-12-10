using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Models.ViewModels
{
    public class IntroVM
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Introduce { get; set; }
        public string Question { get; set; }
        public string CorrectAnwser { get; set; }
        public List<string> Anwsers { get; set; }
        public string ScriptAnwser { get; set; }
    }
}
