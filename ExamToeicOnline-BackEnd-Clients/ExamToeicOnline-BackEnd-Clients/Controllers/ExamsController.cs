

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using ExamToeicOnline_BackEnd_Clients.Common;
using ExamToeicOnline_BackEnd_Clients.EF;
using ExamToeicOnline_BackEnd_Clients.Models;
using ExamToeicOnline_BackEnd_Clients.Models.ViewModels;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using DocumentFormat.OpenXml.Bibliography;
using static System.Net.Mime.MediaTypeNames;


namespace ExamToeicOnline_BackEnd_Clients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ExamsController : ControllerBase
    {
        private readonly ExamToeicOnlineDBContext _context;
        private readonly IStorageService _storageService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ExamsController(ExamToeicOnlineDBContext examToeicOnlineDBContext, IStorageService storageService, IWebHostEnvironment webHostEnvironment)
        {
            this._context = examToeicOnlineDBContext;
            this._storageService = storageService;
            this._webHostEnvironment = webHostEnvironment;
        }
        //GET: get exam
        [HttpGet]
        public async Task<IActionResult> getExamById(int examId)
        {
            var exam = await this._context.Exams.Where(x => x.Id == examId).FirstOrDefaultAsync();
            if (exam == null)
            {
                return NotFound("Can not found any Record!");
            }
            return Ok(exam);
        }
        //GET: get list exams
        [HttpGet("list")]
        public async Task<IActionResult> getListExam()
        {
            var listExam = await this._context.Exams.ToArrayAsync();
            if (listExam == null)
            {
                return NotFound("Can not found any Record!");
            }
            return Ok(listExam);
        }

        [HttpPost("{import}")]
        public async Task<IActionResult> Import([FromForm] ImportExamVM importExamVM)
        {
            string nameFile = importExamVM.ExcelFile.FileName;
            //string nameFileSolution = importExamVM.ExcelSulotion.FileName;
            string filePath = $"{this._webHostEnvironment.WebRootPath}\\wwwroot\\uploads\\exams\\";
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
            using (FileStream fileStream = System.IO.File.Create(filePath+ nameFile))
            {
                await importExamVM.ExcelFile.CopyToAsync(fileStream);
                fileStream.Flush();
            }
            
            //create exam
            this._context.Exams.Add(new Exam()
            {
                Title = importExamVM.ExcelFile.FileName.Split('.')[0],
                Duration = 120

            });
            await this._context.SaveChangesAsync();
            var exam = await this._context.Exams.OrderByDescending(x => x.Id).FirstOrDefaultAsync();
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            int partid = 0;
            int anwser_in_question_num = 0;
            int question_in_group_num = 0;
            int count_image = 0;
            int count_audio = 0;
            int countAnwser = 4;
            int countQuestion = 0;
            int QuestionId = 0;
            int GroupQuestionId = 0;
            int count_group = 0;
            //string base64FileAudiopresentation = null;
            var file = "";
            byte[] imageArray;
            byte[] audioArray;
            int kt = 1;
            var fileAudio = "";


            using (var stream = System.IO.File.Open(filePath + nameFile, FileMode.Open, FileAccess.Read, FileShare.None))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {

                    do
                    {
                        if (reader.Name != "answer")
                        {
                            if (reader.Name == "Part 1") {  count_image = 1; anwser_in_question_num = 4; countQuestion = 6; question_in_group_num = 6; }
                            else if (reader.Name == "Part 2") { countAnwser = 3; anwser_in_question_num = 3; countQuestion = 25; question_in_group_num = 25; }
                            else if (reader.Name == "Part 3") { count_audio = 1; countAnwser = 4; anwser_in_question_num = 4; countQuestion = 3; question_in_group_num = 3; }
                            else if (reader.Name == "Part 4") {  count_audio = 1; anwser_in_question_num = 4; countQuestion = 3; question_in_group_num = 3; }
                            else if (reader.Name == "Part 5") { count_audio = 1; anwser_in_question_num = 4; countQuestion = 30; question_in_group_num = 30; }
                            else if (reader.Name == "Part 6") {  count_image = 1; anwser_in_question_num = 4; countQuestion = 4; question_in_group_num = 4; }
                            else {  count_image = 1; anwser_in_question_num = 4; countQuestion = 2; question_in_group_num = 2; count_group = 1; }
                            string base64ImageRepresentation_Question = null;
                            string base64ImageRepresentation_Group = null;
                            string base64FileAudio = null;

                            int line = 0;
                            int n = 1;
                            while (reader.Read())//read each row
                            {

                                if (line != 1)
                                {
                                    line++;
                                }
                                else
                                {
                                    //create GroupQuestion
                                    if (countQuestion == question_in_group_num)
                                    {

                                        this._context.GroupQuestions.Add(new GroupQuestion() { ExamId = exam.Id });
                                        await this._context.SaveChangesAsync();
                                        var groupQuestion = await this._context.GroupQuestions.OrderByDescending(x => x.Id).FirstOrDefaultAsync();
                                        GroupQuestionId = groupQuestion.Id;
                                        countQuestion = 0;

                                        if (reader.Name == "Part 1")
                                        {
                                            //save file audio
                                            fileAudio = "/wwwroot/uploads/audios/part1.mp3";
                                            //audioArray = System.IO.File.ReadAllBytes(fileAudio);
                                            //base64FileAudio = Convert.ToBase64String(//audioArray);
                                            base64FileAudio = "https://localhost:5001" + fileAudio;
                                            await this.createFiliAudio(base64FileAudio, GroupQuestionId);
                                        }
                                        else if (reader.Name == "Part 2")
                                        {
                                            //save file audio
                                            fileAudio = "/wwwroot/uploads/audios/part2.mp3";
                                            //audioArray = System.IO.File.ReadAllBytes(fileAudio);
                                            //base64FileAudio = "https://localhost:5001" + fileAudio;
                                            base64FileAudio = "https://localhost:5001" + fileAudio;
                                            await this.createFiliAudio(base64FileAudio, GroupQuestionId);
                                        }
                                        else if (reader.Name == "Part 3")
                                        {
                                            //save file audio
                                            fileAudio = "/wwwroot/uploads/audios/part3." + count_audio + ".mp3";
                                            count_audio++;
                                            //audioArray = System.IO.File.ReadAllBytes(fileAudio);
                                            // base64FileAudio = "https://localhost:5001" + fileAudio;
                                            base64FileAudio = "https://localhost:5001" + fileAudio;
                                            await this.createFiliAudio(base64FileAudio, GroupQuestionId);

                                        }
                                        else if (reader.Name == "Part 4")
                                        {
                                            //save file audio
                                            fileAudio = "/wwwroot/uploads/audios/part4." + count_audio + ".mp3";
                                            count_audio++;
                                            //audioArray = System.IO.File.ReadAllBytes(fileAudio);
                                            base64FileAudio = "https://localhost:5001" + fileAudio;
                                            await this.createFiliAudio(base64FileAudio, GroupQuestionId);
                                        }
                                        else if (reader.Name == "Part 5")
                                        {
                                            //save file audio
                                            fileAudio = "/wwwroot/uploads/audios/part5." + count_audio + ".mp3";
                                            count_audio++;
                                            //audioArray = System.IO.File.ReadAllBytes(fileAudio);
                                            base64FileAudio = "https://localhost:5001" + fileAudio;
                                            await this.createFiliAudio(base64FileAudio, GroupQuestionId);
                                        }
                                        else if (reader.Name == "Part 6")
                                        {
                                            file = "/wwwroot/uploads/images/part6_" + count_image + ".png";
                                            count_image++;
                                            //imageArray = System.IO.File.ReadAllBytes(file);
                                            // base64ImageRepresentation_Group = Convert.ToBase64String(//imageArray);
                                            base64ImageRepresentation_Group = "https://localhost:5001" + file;
                                            await this.createParagraph(base64ImageRepresentation_Group, GroupQuestionId);
                                        }
                                        else if (reader.Name == "Part 7")
                                        {


                                            if (count_group < 11)
                                            {
                                                if (count_group <= 4)
                                                {
                                                    file = "/wwwroot/uploads/images/part7_" + count_image + ".png";

                                                    count_image++;
                                                }
                                                else if (count_group <= 7)
                                                {
                                                    if (kt == 1)
                                                    {

                                                        question_in_group_num = 3;
                                                        kt++;//k=2
                                                    }

                                                    file = "/wwwroot/uploads/images/part7_" + count_image + ".png";
                                                    count_image++;

                                                }
                                                else if (count_group <= 10)
                                                {
                                                    if (kt == 2)
                                                    {
                                                        question_in_group_num = 4;
                                                        kt++;//k=3
                                                    }
                                                    file = "/wwwroot/uploads/images/part7_" + count_image + ".png";
                                                    count_image++;

                                                }
                                                //imageArray = System.IO.File.ReadAllBytes(file);
                                                base64ImageRepresentation_Group = "https://localhost:5001" + file;
                                                await this.createParagraph(base64ImageRepresentation_Group, GroupQuestionId);
                                                count_group++;
                                            }
                                            else
                                            {

                                                if (kt == 3)
                                                {
                                                    question_in_group_num = 5;
                                                    kt++;
                                                }
                                                if (count_image <= 12)
                                                {
                                                    while (n < 3)
                                                    {
                                                        file = "/wwwroot/uploads/images/part7_" + count_image + "_" + n + ".png";
                                                        n++;
                                                        //imageArray = System.IO.File.ReadAllBytes(file);
                                                        base64ImageRepresentation_Group = "https://localhost:5001" + file;
                                                        await this.createParagraph(base64ImageRepresentation_Group, GroupQuestionId);
                                                    }
                                                    n = 1;
                                                }
                                                else
                                                {
                                                    while (n < 4)
                                                    {
                                                        file = "/wwwroot/uploads/images/part7_" + count_image + "_" + n + ".png";
                                                        n++;
                                                        //imageArray = System.IO.File.ReadAllBytes(file);
                                                        base64ImageRepresentation_Group = "https://localhost:5001" + file;
                                                        await this.createParagraph(base64ImageRepresentation_Group, GroupQuestionId);
                                                    }
                                                    n = 1;
                                                }
                                                count_image++;
                                                count_group++;
                                            }
                                        }



                                    }
                                    //create fileAudio

                                    //create question
                                    if (countAnwser == anwser_in_question_num)
                                    {
                                        if (reader.Name == "Part 1")
                                        {

                                            file = "/wwwroot/uploads/images/part1_" + count_image + ".PNG";
                                            //imageArray = System.IO.File.ReadAllBytes(file);
                                            //base64ImageRepresentation_Question = Convert.ToBase64String(//imageArray);
                                            count_image++;
                                            base64ImageRepresentation_Question = "https://localhost:5001" + file;

                                        }

                                        await this.createQuestion(reader.GetValue(1).ToString(), reader.Name, base64ImageRepresentation_Question, GroupQuestionId, exam.Id);
                                        var question = await this._context.Questions.OrderByDescending(x => x.Id).FirstOrDefaultAsync();
                                        QuestionId = question.Id;
                                        countAnwser = 0;
                                    }
                                    //create anwser
                                    else
                                    {
                                        await this.createAnwser(reader.GetValue(1).ToString(), false, QuestionId);
                                        countAnwser++;
                                        if (countAnwser == anwser_in_question_num) { countQuestion++; }
                                    }
                                }
                            }
                        }
                        else
                        {
                            var listQuestions = await this._context.Questions.Where(q => q.ExamId == exam.Id).Select(q => q.Id).ToArrayAsync();

                            int n=0;
                            while (reader.Read())
                            {

                                for (int i = 0; i < 5; i++)
                                {
                                    string asw = reader.GetValue(i).ToString().Split('.')[1];
                                    switch (asw)
                                    {
                                        case "A":
                                            await this.updateAnswer(listQuestions[n], 1);
                                            break;
                                        case "B":
                                            await this.updateAnswer(listQuestions[n], 2);
                                            break;
                                        case "C":
                                            await this.updateAnswer(listQuestions[n], 3);
                                            break;
                                        default:
                                            await this.updateAnswer(listQuestions[n], 4);
                                            break;
                                    }
                                    n++;
                                }
                            }
                        }
                    } while (reader.NextResult());

                }
            }

            
            return Ok("Import success!!!");

        }
        private async Task<IActionResult> updateAnswer(int questionId, int numberAnswer)
        {
            var answer = await this._context.Anwsers.Where(a => a.QuestionId == questionId).Skip(numberAnswer - 1).Take(1).FirstOrDefaultAsync();
            answer.Correct = true;
            this._context.Anwsers.Update(answer);
            await this._context.SaveChangesAsync();
            return Ok(answer);
        }
        private async Task<int> createParagraph(string base64ImageRepresentation_Group, int GroupQuestionId)
        {
            this._context.Paragraphs.Add(new Paragraph()
            {
                image_Script = base64ImageRepresentation_Group.ToLower(),
                GroupQuestionId = GroupQuestionId
            });
            await this._context.SaveChangesAsync();
            return 1;
        }
        private async Task<int> createFiliAudio(string filiAudio, int GroupQuestionId)
        {
            this._context.FileAudios.Add(new FileAudio()
            {
                file_Audio = filiAudio.ToLower(),
                GroupQuestionId = GroupQuestionId
            });
            await this._context.SaveChangesAsync();
            return 1;
        }
        private async Task<int> createQuestion(string content, string partName, string image, int groupQuestionsId, int examId)
        {
            this._context.Questions.Add(new Question()
            {
                Content = content,
                PartName= partName,
                Image = image,
                GroupQuestionId = groupQuestionsId,
                ExamId=examId
            });
            await this._context.SaveChangesAsync();
            return 1;
        }
        private async Task<int> createAnwser(string content, Boolean correct, int questionsId)
        {
            this._context.Anwsers.Add(new Anwser()
            {
                Content=content,
                Correct=correct,
                QuestionId=questionsId
            });
            await this._context.SaveChangesAsync();
            return 1;
        }
        [HttpPost("{import}/{score}")]
        public async Task<IActionResult> ImportAnswer([FromForm] ImportExamVM importExamVM)
        {

            string nameFile = importExamVM.ExcelFile.FileName;
            string filePath = $"{this._webHostEnvironment.WebRootPath}\\wwwroot\\uploads\\score\\";
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
            using (FileStream fileStream = System.IO.File.Create(filePath + nameFile))
            {
                await importExamVM.ExcelFile.CopyToAsync(fileStream);
                fileStream.Flush();
            }
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            var stream = System.IO.File.Open(filePath + nameFile, FileMode.Open, FileAccess.Read, FileShare.None);
            var reader = ExcelReaderFactory.CreateReader(stream);
            using (stream)
            {
                using (reader)
                {
                    while (reader.Read())
                    {
                        this._context.Scores.Add(new Score()
                        {
                            numberQuestion = Int32.Parse(reader.GetValue(0).ToString()),
                            ScoreLC = Int32.Parse(reader.GetValue(1).ToString()),
                            ScoreRC = Int32.Parse(reader.GetValue(2).ToString())
                        });
                        await this._context.SaveChangesAsync();
                    }

                }
            }
            return Ok("Import success!");
        }

        [HttpPost("tomark")]
        public async Task<IActionResult> ToMark([FromBody] FeedbacAnswerVM feedbacAnswerVM)
        {
            int countLC = 0;
            int countRC = 0;
        
            var answerCorrects = from q in this._context.Questions
                                 join a in this._context.Anwsers on q.Id equals a.QuestionId
                                 where q.ExamId == feedbacAnswerVM.ExamId && a.Correct == true
                                 select new AnswerSelectVM()
                                 {
                                     QuestionId = q.Id,
                                     AnswerId = a.Id
                                 };
            List<AnswerSelectVM> answerSelected = new List<AnswerSelectVM>();
            foreach (var item in answerCorrects)
            {
                answerSelected.Add(item);
            }
            foreach (var item in feedbacAnswerVM.answerSelectVMs)
            {
                for (int idx = 0; idx < answerSelected.Count; idx++)
                {
                    if (item.QuestionId == answerSelected[idx].QuestionId && item.AnswerId == answerSelected[idx].AnswerId)
                    {
                        if (answerSelected.FindIndex(a => a.QuestionId == answerSelected[idx].QuestionId) >= 0)
                        {
                            if (answerSelected.FindIndex(a => a.QuestionId == answerSelected[idx].QuestionId) <= 99)
                            {
                                countLC++;
                            }
                            else
                            {
                                countRC++;
                            }

                        }
                        idx = answerSelected.Count;
                    }
                }
             
            }

            var scores = await this._context.Scores.Where(s => s.numberQuestion == countLC || s.numberQuestion == countRC).ToArrayAsync();
            int Score = 0;
            int ScoreListening = 0;
            int ScoreReading = 0;
            foreach (var item in scores)
            {
                if (countLC != countRC)
                {
                    if (item.numberQuestion == countLC)
                    {
                        ScoreListening = item.ScoreLC;
                    }
                    if (item.numberQuestion == countRC)
                    {
                        ScoreReading = item.ScoreRC;
                    }
                }
                else
                {
                    ScoreListening = item.ScoreLC;
                    ScoreReading = item.ScoreRC;
                }
            }
            this._context.DoExams.Add(new DoExam()
            {
                StartedAt = UnixTimeStampToDateTime(feedbacAnswerVM.StartedAt),
                FinishedAt = UnixTimeStampToDateTime(feedbacAnswerVM.FinishedAt),
                ScoreListening = ScoreListening,
                ScoreReading = ScoreReading,
                UserId = feedbacAnswerVM.UserId,
                ExamId = feedbacAnswerVM.ExamId
            });
            await this._context.SaveChangesAsync();
            var doexam = await this._context.DoExams.OrderByDescending(x => x.Id).FirstOrDefaultAsync();
            DoExamVM doExamVM = new DoExamVM();
            doExamVM.UserId = doexam.UserId;
            doExamVM.ExamId = doexam.ExamId;
            doExamVM.StartedAt = doexam.StartedAt;
            doExamVM.FinishedAt = doexam.FinishedAt;
            doExamVM.ScoreListening = doexam.ScoreListening;
            doExamVM.ScoreReading = doexam.ScoreReading;
            return Ok(doExamVM);
        }

        public DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            TimeSpan time = TimeSpan.FromMilliseconds(unixTimeStamp);
            DateTime startdate = new DateTime(1970, 1, 1) + time;
            DateTime dateInLocalTimeFormat = startdate.ToLocalTime();
            return dateInLocalTimeFormat;
        }

    }
   

}
