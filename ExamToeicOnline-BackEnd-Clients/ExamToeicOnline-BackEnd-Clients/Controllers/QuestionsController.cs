using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExamToeicOnline_BackEnd_Clients.Common;
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
        private readonly IStorageService _storageService;
        public QuestionsController(ExamToeicOnlineDBContext examToeicOnlineDBContext, IStorageService storageService)
        {
            this._context = examToeicOnlineDBContext;
            this._storageService = storageService;

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
        [HttpGet("PartName")]
        public async Task<IActionResult> GetQuestion(int examId,string partName)
        {

            var questionList = from q in this._context.Questions

                               join g in this._context.GroupQuestions on q.GroupQuestionId equals g.Id
                               //join f in this._context.FileAudios on q.GroupQuestionId equals f.Id
                               join p in this._context.Paragraphs on q.GroupQuestionId equals p.Id


                               where q.ExamId == examId && q.PartName == partName
                               select (new QuestionVM()
                               {
                                   Id = q.Id,
                                   Content = q.Content,
                                   Image = q.Image,
                                   FileAudio="",
                                   GroupQuestionId = q.GroupQuestionId,
                                   ImageGroup=p.image_Script
                               });
            if (questionList==null)
            {
                return NotFound("Can not found any Record!");
            }
            return Ok(questionList);


        }


    }
}
