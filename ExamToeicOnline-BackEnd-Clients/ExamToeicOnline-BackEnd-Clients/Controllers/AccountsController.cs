using System;
using System.Collections.Generic;
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
        //GET:search
        [HttpGet("{username}")]
        public async Task<IActionResult> GetByUsernam(string username)
        {
            var account = await this._context.Accounts.Where(a => a.Username.Contains(username)).FirstOrDefaultAsync();
            if (account == null)
            {
                return BadRequest("Can not found username");
            }
            return Ok(account);
        }
        //Login
        [HttpPost("{Login}")]
        public async Task<IActionResult> Login([FromBody] AccountVM request) 
        {
            var account = await _context.Accounts.Where(x => x.Username == request.Username.Trim()).FirstOrDefaultAsync();
            try
            {
                if (account == null)
                {
                    return BadRequest("Username " + request.Username + " not exists");
                }
                else
                {
                    if (account.isActive)
                    {
                        if (account.Password == request.Password.Trim())
                        {
                            return Ok(account);
                        }
                        else
                        {
                            return BadRequest("Password is incorrect!");
                        }
                    }
                    else
                    {
                        return BadRequest("Account is not activated!");
                    }
                }
            }
            catch (Exception)
            {

                return BadRequest("Login fail!");
            }
           
        }


    }
}
