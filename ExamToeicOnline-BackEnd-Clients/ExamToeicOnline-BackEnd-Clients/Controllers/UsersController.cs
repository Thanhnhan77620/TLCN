using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExamToeicOnline_BackEnd_Clients.EF;
using ExamToeicOnline_BackEnd_Clients.Models.ViewModels;
using ExamToeicOnline_FrontEnd_Clients.Models;
using ExamToeicOnline_BackEnd_Clients.Controllers;




namespace ExamToeicOnline_BackEnd_Clients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ExamToeicOnlineDBContext _context;
 
        public UsersController(ExamToeicOnlineDBContext examToeicOnlineDBContex)
        {
            this._context = examToeicOnlineDBContex;
           
        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var user = await this._context.Users.Include(x => x.Accounts).ToArrayAsync();
            if (user == null)
            {
                return NotFound("Can not found any Record!");
            }
            return Ok(user);
        }

      //  POST: api/register
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserVM request)
        {
            var user = await _context.Users.Where(u => u.Email == request.Email).FirstOrDefaultAsync();

            try
            {
                if (user != null)
                {
                    return BadRequest("Email " + request.Email + " Exist");
                }
                else
                {
                    user = new User()
                    {
                        Fullname = request.Fullname,
                        Email = request.Email,
                        Phonenumber = request.Phonenumber
                    };
                    this._context.Users.Add(user);
                    await this._context.SaveChangesAsync();
                    try
                    {
                        var account = new Account()
                        {
                            Username = request.Email.Split('@')[0],
                            Password = request.Phonenumber.ToString(),
                            isActive = true,
                            UserId = user.Id
                        };
                        this._context.Accounts.Add(account);
                        await this._context.SaveChangesAsync();
                    }
                    catch (Exception err)
                    {

                        return BadRequest("Error messgae: " + err.Message);
                    }

                }
            }
            catch (Exception e)
            {

                return BadRequest("Error messgae: " + e.Message);
            }


            return Ok(user);
        }

    }
}
