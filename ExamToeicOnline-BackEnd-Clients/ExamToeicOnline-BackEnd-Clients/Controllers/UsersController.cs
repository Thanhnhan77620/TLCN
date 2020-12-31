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
using Microsoft.AspNetCore.Hosting;

namespace ExamToeicOnline_BackEnd_Clients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ExamToeicOnlineDBContext _context;
        private readonly IStorageService _storageService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public UsersController(ExamToeicOnlineDBContext examToeicOnlineDBContext, IStorageService storageService, IWebHostEnvironment webHostEnvironment)
        {
            this._context = examToeicOnlineDBContext;
            this._storageService = storageService;
            this._webHostEnvironment = webHostEnvironment;

        }
        // GET: get all user 
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            //var user = await this._context.Users.ToArrayAsync();
            var user = (from u in this._context.Users
                        select new UserDTO() { 
                            Id=u.Id,
                            Fullname=u.Fullname,
                            PhoneNumber=u.PhoneNumber,
                            Birthday=u.Birthday,
                            Image=u.Image
                        });
            if (user == null)
            {
                return NotFound("Can not found an record!");

            }
            return Ok(user);
        }
        //GET: get one user
        [HttpGet("{UserId}")]
        public async Task<IActionResult> GetUserById(Guid UserId)
        {
            var user = await this._context.Users.Where(u => u.Id == UserId).FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound("Can not foud the user with ID=" + UserId);

            }
            return Ok(user);
        }

        //  POST: register
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] GuestVM request)
        {
            var user = await _context.Users.Where(u => u.Email == request.Email).FirstOrDefaultAsync();

            if (user != null)
            {
                return BadRequest("Email " + request.Email + " exist!");
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
                        isActive = true
                    };

                    account.Password = BC.HashPassword(request.Password);

                    this._context.Accounts.Add(account);
                    await this._context.SaveChangesAsync();
                }
                catch (Exception err)
                {

                    return BadRequest(err.Message);
                }
            }
            return Ok(user);
        }

        [HttpPut("{UserId}")]
        public async Task<IActionResult> Update([FromForm] UserVM request)
        {
            var users = await this._context.Users.Where(u => u.Id != request.Id).ToArrayAsync();
            var userCurrent = await this._context.Users.Where(u => u.Id == request.Id).FirstOrDefaultAsync();
            if (userCurrent == null)
            {
                return NotFound("Can not foud the user with ID=" + request.Id);
            }
            else
            {
                userCurrent.Fullname = request.Fullname;
                userCurrent.PhoneNumber = request.PhoneNumber;
                //check email exists
                foreach (var user in users)
                {
                    if (user.Email==request.Email)
                    {
                        return BadRequest("Email " + request.Email + " exist!");
                    }
                    else
                    {
                        userCurrent.Email = request.Email;
                        break;
                    }
                }
                userCurrent.Birthday = request.Birthday;

                if (request.Image!=null)
                {
                    //host static image
                    Int32 unixTimestamp = (Int32)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
                    string nameImage = unixTimestamp.ToString() + "." + request.Image.FileName.Split('.')[1];
                    string filePath = $"{this._webHostEnvironment.WebRootPath}\\wwwroot\\uploads\\avatars\\";
                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }
                    using (FileStream fileStream = System.IO.File.Create(filePath + nameImage))
                    {
                        await request.Image.CopyToAsync(fileStream);
                        fileStream.Flush();
                    }
                    userCurrent.Image = "https://localhost:5001/wwwroot/uploads/avatars/" + nameImage;
                }
                    
                
                
               
                this._context.Users.Update(userCurrent);
                await this._context.SaveChangesAsync();

            }
            return Ok(userCurrent);
        }
       
    }
}
