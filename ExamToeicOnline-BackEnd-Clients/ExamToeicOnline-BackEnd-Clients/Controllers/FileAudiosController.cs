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
        [HttpGet("{fileId}")]
        public async Task<IActionResult> GetFileAudioById(int fileId)
        {
            var audioBase64 = await this._context.FileAudios.FindAsync(fileId);
            return Ok(audioBase64);
        }
    }
}
