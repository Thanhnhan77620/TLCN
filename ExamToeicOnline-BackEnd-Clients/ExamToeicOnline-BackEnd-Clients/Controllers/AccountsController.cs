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
    public class AccountsController : ControllerBase
    {
        private readonly ExamToeicOnlineDBContext _context;
        public AccountsController(ExamToeicOnlineDBContext examToeicOnlineDBContext)
        {
            this._context = examToeicOnlineDBContext;

        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var accounts = await this._context.Accounts.ToArrayAsync();
            if (accounts == null)
            {
                return NotFound("Can not found any Record!");
            }
            return Ok(accounts);
        }
        //GET:
        [HttpGet("{username}")]
        public async Task<IActionResult> GetByUsernam(string username)
        {
            var account = await this._context.Accounts.Where(a=>a.Username.Contains(username)).FirstOrDefaultAsync();
            if (account == null)
            {
                return BadRequest("Can not found username");
            }
            return Ok(account);
        }
    }
}
