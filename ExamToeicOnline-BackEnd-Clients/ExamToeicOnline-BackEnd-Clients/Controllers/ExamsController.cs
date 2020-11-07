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
            var listExam = await this._context.Questions.ToArrayAsync();
            if (listExam == null)
            {
                return BadRequest("not found");
            }
            return Ok(listExam);
        }




        [HttpPost("Import"), DisableRequestSizeLimit]
        public async Task<IActionResult> Import([FromForm] ImportExamVM ExamVM)
        {
           
           var filePath = "./File/demo.xlsx";


            List<Question> questions = new List<Question>();


            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            using (var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.None))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {

                    while (reader.Read())//read each row
                    {
                        questions.Add(new Question()
                        {
                            Content = reader.GetValue(4).ToString()
                        });
                    }
                }
            }
            this._context.Questions.AddRange(questions);
            await this._context.SaveChangesAsync();
            return Ok(filePath);
        }


        //Save File
        private async Task<string> SaveFile(IFormFile file)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            await _storageService.SaveFileAsync(file.OpenReadStream(), fileName);
            return _storageService.GetFileUrl(fileName);
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
