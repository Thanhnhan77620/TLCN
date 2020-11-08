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
using ExamToeicOnline_BackEnd_Clients.Common;
using System.Net.Http.Headers;
using System.IO;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using BC = BCrypt.Net.BCrypt;

namespace ExamToeicOnline_BackEnd_Clients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ExamToeicOnlineDBContext _context;
        private readonly IStorageService _storageService;
        public UsersController(ExamToeicOnlineDBContext examToeicOnlineDBContext, IStorageService storageService)
        {
            this._context = examToeicOnlineDBContext;
            this._storageService = storageService;

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
        public async Task<IActionResult> Create([FromForm] GuestVM request)
        {
            var user = await _context.Users.Where(u => u.Email == request.Email).FirstOrDefaultAsync();

            try
            {
                if (user != null)
                {
                    return NotFound("Email " + request.Email + " Exist");
                }
                else
                {
                    
                    try
                    {
                        //create uer
                        user = new User()
                        {
                            Fullname = request.Fullname,
                            Email = request.Email, 
                            
                        };                    
                        this._context.Users.Add(user);
                        //create account
                        var account = new Account()
                        {
                            Username = request.Email.Split('@')[0],                        
                            CreateAt = DateTime.Now,
                            UserId = user.Id,
                            isActive=true
                        };
                      
                        account.Password = BC.HashPassword(request.Password);
                                   
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
       
        [HttpPut("{UserId}")]
        public async Task<IActionResult> Update([FromForm] Guid request)
        {
            var user = await this._context.Users.Where(u=>u.Id==request).FirstOrDefaultAsync();
            //if (user == null)
            //{
            //    return NotFound("Can not find user has ID=" + request.Id);
            //}
            //else
            //{
            //    user.Fullname = request.Fullname;
            //    user.Phonenumber = request.Phonenumber;
            //    user.Email = request.Email;
            //    user.Birthday = request.Birthday;
            //    //Save image
            //    if (HttpContext.Request.Form.Files.Count > 0)
            //    {
            //        var file = HttpContext.Request.Form.Files[0];

            //        byte[] fileData = null;

            //        using (var binaryReader = new BinaryReader(file.OpenReadStream()))
            //        {
            //            fileData = binaryReader.ReadBytes((int)file.Length);
            //        }

            //        user.Image = fileData;
            //    }

            //    this._context.Users.Update(user);
            //    await this._context.SaveChangesAsync();

            //}

            return Ok(user);
        }
      
        
        
    }
}
