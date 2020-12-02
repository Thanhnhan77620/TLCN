using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExamToeicOnline_BackEnd_Clients.EF;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamToeicOnline_BackEnd_Clients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParagraphsController : ControllerBase
    {
        private readonly ExamToeicOnlineDBContext _context;

        public ParagraphsController(ExamToeicOnlineDBContext examToeicOnlineDBContext)
        {
            this._context = examToeicOnlineDBContext;

        }
        [HttpGet("{ParagraphId}")]
        public async Task<IActionResult> GetParagraphById(int ParagraphId)
        {
            var paragraphs = await this._context.Paragraphs.Where(x => x.Id == ParagraphId).ToArrayAsync();
            if (paragraphs == null)
            {
                return NotFound("Can not found an record!");

            }
            return Ok(paragraphs);
        }
    }
}
