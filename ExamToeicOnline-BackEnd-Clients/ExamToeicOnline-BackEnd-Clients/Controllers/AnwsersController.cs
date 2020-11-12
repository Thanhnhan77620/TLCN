using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExamToeicOnline_BackEnd_Clients.Common;
using ExamToeicOnline_BackEnd_Clients.EF;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamToeicOnline_BackEnd_Clients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnwsersController : ControllerBase
    {
        private readonly IStorageService _storageService;
        private readonly ExamToeicOnlineDBContext _context;
        public AnwsersController(ExamToeicOnlineDBContext examToeicOnlineDBContext, IStorageService storageService)
        {
            this._context = examToeicOnlineDBContext;
            this._storageService = storageService;
          

        }
        //GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var anwsers = await this._context.Anwsers.ToArrayAsync();
            if (anwsers == null)
            {
                return NotFound("Can not found any Record!");
            }
            return Ok(anwsers);
        }
    }
}
