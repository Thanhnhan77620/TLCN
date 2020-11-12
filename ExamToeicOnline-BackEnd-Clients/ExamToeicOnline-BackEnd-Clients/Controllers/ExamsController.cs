

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
        [HttpGet("{list}")]
        public async Task<IActionResult> getListExam()
        {
            var listExam = await this._context.Exams.ToArrayAsync();
            if (listExam == null)
            {
                return BadRequest("not found");
            }
            return Ok(listExam);
        }




        [HttpPost("Import"), DisableRequestSizeLimit]
        public async Task<IActionResult> Import([FromForm] ImportExamVM importExamVM)
        {
           
            var filePath = "./File/exam.xlsx";
            //create exam
            
            this._context.Exams.Add(new Exam() { Title = "Đề số 4" });
            await this._context.SaveChangesAsync();
            var Exam = await this._context.Exams.OrderByDescending(x => x.Id).FirstOrDefaultAsync();

            List<Question> questions = new List<Question>();
            List<Part> parts = new List<Part>();
            List<Anwser> anwsers = new List<Anwser>();

            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            using (var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.None))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {

                    while (reader.Read())//read each row
                    {
                        //create part
                        parts.Add(new Part()
                        {
                            Title = reader.GetValue(1).ToString(),
                            Direction = reader.GetValue(1).ToString(),
                            ExamId= Exam.Id

                        });
                        this._context.Parts.AddRange(parts);
                        //create question
                        questions.Add(new Question()
                        {
                            Content = reader.GetValue(1).ToString()
                        });
                        this._context.Questions.AddRange(questions);
                        anwsers.Add(new Anwser()
                        {
                            Content = reader.GetValue(2).ToString(),
                            Correct = Boolean.Parse(reader.GetValue(3).ToString()),


                        });
                        // this._context.Anwser.AddRange(anwsers);

                    }
                }
            }

            return Ok(Exam);
        }


        private IActionResult Index(IFormFile file, [FromServices] IHostingEnvironment hostingEnvironment)
        {
            string filePath = $"{hostingEnvironment.WebRootPath}\\File\\{file.FileName}";
            using (FileStream fileStream = System.IO.File.Create(filePath))
            {
                file.CopyTo(fileStream);
                fileStream.Flush();
            }
            return Ok();
        }
    }
}
