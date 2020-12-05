using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ExamToeicOnline_BackEnd_Clients.EF;
using ExamToeicOnline_BackEnd_Clients.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamToeicOnline_BackEnd_Clients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileAudiosController : ControllerBase
    {
        private readonly ExamToeicOnlineDBContext _context;

        public FileAudiosController(ExamToeicOnlineDBContext examToeicOnlineDBContext)
        {
            this._context = examToeicOnlineDBContext;


        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var audioBase64 = await this._context.FileAudios.FirstOrDefaultAsync();
            return Ok(audioBase64);
        }
        [HttpPost]
        public async Task<IActionResult> Import([FromForm] ImportExamVM importExamVMt)
        {
            var file = HttpContext.Request.Form.Files[0];
            byte[] fileAudio = null;
            using (var binaryReader = new BinaryReader(file.OpenReadStream()))
            {
                fileAudio = binaryReader.ReadBytes((int)file.Length);
            }
            //byte[] fileAudio = System.IO.File.ReadAllBytes(file);
            string base64File = Convert.ToBase64String(fileAudio);
            this._context.FileAudios.Add(new Models.FileAudio()
            {
                file_Audio= base64File,
                GroupQuestionId=1
            });
            await this._context.SaveChangesAsync();
            return Ok(base64File);
        }
    }
}
