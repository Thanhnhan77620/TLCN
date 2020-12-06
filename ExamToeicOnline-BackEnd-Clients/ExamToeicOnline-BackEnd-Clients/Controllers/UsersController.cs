﻿using System;
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
        // GET: get all user 
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IActionResult res;
            var user = await this._context.Users.Include(x => x.Accounts).ToArrayAsync();
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
       
        //[HttpPut("{UserId}")]
        //public async Task<IActionResult> Update([FromForm] UserVM request)
        //{
        //    var user = await this._context.Users.Where(u => u.Id == request.Id).FirstOrDefaultAsync();
        //    if (user == null)
        //    {
        //        return NotFound("Can not foud the user with ID=" + request.Id);
        //    }
        //    else
        //    {
        //        user.Fullname = request.Fullname;
        //        user.PhoneNumber = request.PhoneNumber;
        //        //check email exists
        //        if(await checkEmailNotExit(request.Id, request.Email)==false)
        //        {
        //            return BadRequest("Email " + request.Email + " exist!");
        //        }
        //        else
        //        {
        //            user.Email = request.Email;
        //        }
        //        user.Birthday = request.Birthday;
        //        user.Image = request.Image;
        //        this._context.Users.Update(user);
        //        await this._context.SaveChangesAsync();

        //    }
        //    return Ok("Update infomation successfully!");
        //}

        //[HttpGet("pp")]
        //public async Task<IActionResult> checkEmailNotExit(Guid id ,string email)
        //{
        //    var user1 = from u in this._context.Users
        //               where u.Id==id
        //               select u;
        //    var user = await this._context.Users.Where(u => u.Id == request.Id).FirstOrDefaultAsync();
        //    if (user == null)
        //    {
        //        return NotFound("Can not foud the user with ID=" + request.Id);
        //    }
        //    else
        //    {
        //        user.Fullname = request.Fullname;
        //        user.PhoneNumber = request.PhoneNumber;
        //        ////check email exists
        //        //if(await this._context.Users.Where(u => u.Email == request.Email).FirstOrDefaultAsync()!=null)
        //        //{
        //        //    return BadRequest("Email " + request.Email + " exist!");
        //        //}
        //        //else
        //        //{
        //        //    user.Email = request.Email;
        //        //}
        //        user.Email = request.Email;
        //        user.Birthday = request.Birthday;
        //        user.Image = request.Image;
        //        //Save image
        //        //if (HttpContext.Request.Form.Files.Count > 0)
        //        //{
        //        //    var file = HttpContext.Request.Form.Files[0];

        //        //    byte[] fileData = null;

        //        //    using (var binaryReader = new BinaryReader(file.OpenReadStream()))
        //        //    {
        //        //        fileData = binaryReader.ReadBytes((int)file.Length);
        //        //    }


        //    var user2 = from u in this._context.Users
        //                where !(from m in this._context.Users select m.Id).Contains(id)
        //                select u;

        //    var user = await this._context.Users.Select(user => user.Id).Contains("d");

        //    return Ok((from m in this._context.Users select m.Id).Contains(id));
        //}
        
    }
}
