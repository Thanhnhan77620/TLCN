using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExamToeicOnline_BackEnd_Clients.EF;
using ExamToeicOnline_BackEnd_Clients.Models;
using ExamToeicOnline_BackEnd_Clients.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamToeicOnline_BackEnd_Clients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly ExamToeicOnlineDBContext _context;
        public QuestionsController(ExamToeicOnlineDBContext examToeicOnlineDBContext )
        {
            this._context = examToeicOnlineDBContext;

        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var questions = await this._context.Questions.ToArrayAsync();
            if (questions == null)
            {
                return NotFound("Can not found any Record!");
            }
            return Ok(questions);
        }
        [HttpGet("list")]
        public async Task<IActionResult> GetQuestion(int examId, int numberQuestion)
        {
            try
            {
                var question = await this._context.Questions.Where(q => q.ExamId == examId).Skip(numberQuestion - 1).Take(1).FirstOrDefaultAsync();
                int GroupQuestionId = question.GroupQuestionId;
                var questionList = await this._context.GroupQuestions.Where(g => g.ExamId == examId && g.Id == GroupQuestionId)
                                    .Include(g => g.Questions)
                                        .ThenInclude(g => g.Anwsers)
                                    .Include(g => g.FileAudios)
                                    .Include(g => g.Paragraphs)
                                    .ToArrayAsync();

                return Ok(questionList);
            }
            catch (Exception e)
            {

                return NotFound("Can not found any Record!");
            }
        }
    }
}
