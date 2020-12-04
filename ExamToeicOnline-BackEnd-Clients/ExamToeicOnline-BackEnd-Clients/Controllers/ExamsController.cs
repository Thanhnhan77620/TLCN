

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
        public ExamsController(ExamToeicOnlineDBContext examToeicOnlineDBContext, IStorageService storageService)
        {
            this._context = examToeicOnlineDBContext;
            this._storageService = storageService;
        }
        
        //GET: get list exams
        [HttpGet]
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
        public async Task<IActionResult> Import([FromForm] ImportExamVM importExamVM, [FromServices] IHostingEnvironment hostingEnvironment)
        {
           
            string filePath = $"{hostingEnvironment.WebRootPath}\\File\\Exam01\\{importExamVM.ExcelFile.FileName}";
            using (FileStream fileStream = System.IO.File.Create(filePath))
            {
                importExamVM.ExcelFile.CopyTo(fileStream);
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
            int countAnwser = 4;
            int countQuestion = 0;
            int QuestionId = 0;
            int GroupQuestionId = 0;
            int count_group = 0;
            string base64FileAudiopresentation = null;
            var file = "";
            byte[] imageArray;
            int kt = 1;
            using (var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.None))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {

                    do
                    {
                       
                        if (reader.Name == "Part 1") { partid = 1; count_image = 1; anwser_in_question_num = 4; countQuestion = 6; question_in_group_num = 6; }
                        else if (reader.Name == "Part 2") { partid = 2; countAnwser = 3; anwser_in_question_num = 3; countQuestion = 25; question_in_group_num = 25; }
                        else if (reader.Name == "Part 3") { partid = 3; countAnwser = 4; anwser_in_question_num = 4; countQuestion = 3; question_in_group_num = 3; }
                        else if (reader.Name == "Part 4") { partid = 4; anwser_in_question_num = 4; countQuestion = 3; question_in_group_num = 3; }
                        else if (reader.Name == "Part 5") { partid = 5; anwser_in_question_num = 4; countQuestion = 30; question_in_group_num = 30; }
                        else if (reader.Name == "Part 6") { partid = 6; count_image = 1; anwser_in_question_num = 4; countQuestion = 4; question_in_group_num = 4; }
                        else { partid = 7; count_image = 1; anwser_in_question_num = 4; countQuestion = 2; question_in_group_num = 2; count_group = 1; }
                        string base64ImageRepresentation_Question = null;
                        string base64ImageRepresentation_Group = null;
                        //create PartInExam
                        //this._context.PartInExams.Add(new PartInExam() { PartId = partid, ExamId = exam.Id });
                       // await this._context.SaveChangesAsync();
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
                                   
                                    this._context.GroupQuestions.Add(new GroupQuestion()); 
                                    await this._context.SaveChangesAsync();
                                  
                                    var groupQuestion = await this._context.GroupQuestions.OrderByDescending(x => x.Id).FirstOrDefaultAsync();
                                    GroupQuestionId = groupQuestion.Id;
                                    countQuestion = 0;
                                    if (reader.Name == "Part 6")
                                    {
                                        file = "./File/Exam01/part6_" + count_image + ".png";
                                        count_image++;
                                        imageArray = System.IO.File.ReadAllBytes(file);
                                        base64ImageRepresentation_Group = Convert.ToBase64String(imageArray);
                                        await this.createParagraph(base64ImageRepresentation_Group, GroupQuestionId);
                                    }
                                    else if (reader.Name == "Part 7")
                                    {


                                        if (count_group<11)
                                        {
                                            if (count_group <= 4)
                                            {
                                                file = "./File/Exam01/part7_" + count_image + ".png";
                                                
                                                count_image++;
                                            }
                                            else if (count_group <= 7)
                                            {
                                                if (kt == 1)
                                                {

                                                    question_in_group_num = 3;
                                                    kt++;//k=2
                                                }

                                                file = "./File/Exam01/part7_" + count_image + ".png";
                                                count_image++;

                                            }
                                            else if (count_group <= 10)
                                            {
                                                if (kt == 2)
                                                {
                                                    question_in_group_num = 4;
                                                    kt++;//k=3
                                                }
                                                file = "./File/Exam01/part7_" + count_image + ".png";
                                                count_image++;

                                            }
                                            imageArray = System.IO.File.ReadAllBytes(file);
                                            base64ImageRepresentation_Group = Convert.ToBase64String(imageArray);
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
                                                    file = "./File/Exam01/part7_" + count_image + "_" + n + ".png";
                                                    n++;
                                                    imageArray = System.IO.File.ReadAllBytes(file);
                                                    base64ImageRepresentation_Group = Convert.ToBase64String(imageArray);
                                                    await this.createParagraph(base64ImageRepresentation_Group, GroupQuestionId);
                                                }
                                                n = 1;
                                            }
                                            else
                                            {
                                                while (n < 4)
                                                {
                                                    file = "./File/Exam01/part7_" + count_image + "_" + n + ".png";
                                                    n++;
                                                    imageArray = System.IO.File.ReadAllBytes(file);
                                                    base64ImageRepresentation_Group = Convert.ToBase64String(imageArray);
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

                                        file = "./File/Exam01/part1_" + count_image + ".PNG";
                                        imageArray = System.IO.File.ReadAllBytes(file);
                                        base64ImageRepresentation_Question = Convert.ToBase64String(imageArray);
                                        count_image++;
                                    }

                                    await this.createQuestion(reader.GetValue(1).ToString(), reader.Name, partid, base64ImageRepresentation_Question, GroupQuestionId, exam.Id);
                                    var question = await this._context.Questions.OrderByDescending(x => x.Id).FirstOrDefaultAsync();
                                    QuestionId = question.Id;
                                    countAnwser = 0;
                                }
                                //create anwser
                                else
                                {
                                    await this.createAnwser(reader.GetValue(1).ToString(),true, QuestionId);
                                    countAnwser++;
                                    if (countAnwser == anwser_in_question_num) { countQuestion++;}
                                }
                            }
                        }
                    } while (reader.NextResult());

                }
            }

            return Ok("Import success!");
        }
        private async Task<int> createParagraph(string base64ImageRepresentation_Group, int GroupQuestionId)
        {
            this._context.Paragraphs.Add(new Paragraph()
            {
                image_Script = base64ImageRepresentation_Group,
                GroupQuestionId = GroupQuestionId
            });
            await this._context.SaveChangesAsync();
            return 1;
        }
        private async Task<int> createQuestion(string content, string partName, int partid, string image, int groupQuestionsId, int examId)
        {
            this._context.Questions.Add(new Question()
            {
                Content = content,
               // PartId = partid,
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
        //private async Task<string> SaveFile(IFormFile file)
        //{
        //    var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
        //    var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
        //    await _storageService.SaveFileAsync(file.OpenReadStream(), fileName);
        //    return fileName;
        //}

        //private IActionResult Index(IFormFile file, [FromServices] IHostingEnvironment hostingEnvironment)
        //{
        //    string filePath = $"{hostingEnvironment.WebRootPath}\\File\\{file.FileName}";
        //    using (FileStream fileStream = System.IO.File.Create(filePath))
        //    {
        //        file.CopyTo(fileStream);
        //        fileStream.Flush();
        //    }
        //    return Ok();
        //}
    }
}
