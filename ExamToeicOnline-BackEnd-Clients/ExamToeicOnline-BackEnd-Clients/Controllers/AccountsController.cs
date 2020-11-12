using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ExamToeicOnline_BackEnd_Clients.Common;
using ExamToeicOnline_BackEnd_Clients.EF;
using ExamToeicOnline_BackEnd_Clients.Models.ViewModels;
using ExamToeicOnline_FrontEnd_Clients.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using BC = BCrypt.Net.BCrypt;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace ExamToeicOnline_BackEnd_Clients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly ExamToeicOnlineDBContext _context;
        private readonly IStorageService _storageService;
        private IConfiguration _config;
        public AccountsController(ExamToeicOnlineDBContext examToeicOnlineDBContext, IStorageService storageService, IConfiguration configuration)
        {
            this._context = examToeicOnlineDBContext;
            this._storageService = storageService;
            this._config = configuration;

        }
        //GET: api/<UserController>
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
        [HttpGet("search")]
        public async Task<IActionResult> GetByUsernam(string username)
        {
            var account = await this._context.Accounts.Where(x => x.Username==username.Trim()).FirstOrDefaultAsync();
            if (account == null)
            {
                return BadRequest("Can not found username");
            }
            return Ok(account);
        }
        //Login
        [HttpGet("login")]
        public async Task<IActionResult> Login(string username, string password) 
        {
            
            AccountVM accountVM = new AccountVM();
            accountVM.Username = username;
            accountVM.Password = password;
            IActionResult response = Unauthorized();
            var account = AuthenticateAccount(accountVM);

            accountVM.message = account.message;
            var tokenStr = GenerateJSONWebToken(accountVM);
            response = Ok(new { token = tokenStr });

            return Ok(response);

        }
        private AccountVM AuthenticateAccount(AccountVM accountLogin)
        {
            AccountVM accountVM = new AccountVM();      
            var account = this._context.Accounts.FirstOrDefault(x => x.Username.Equals(accountLogin.Username.Trim()));
           
            if (account==null)
            {
                accountVM.message = "Username " + accountLogin.Username + " not exists1";

            }
            else
            {
                if (account.isActive)
                {
                    if (BC.Verify(accountLogin.Password, account.Password))
                    {
                        accountVM.message = "Successful authentication!";
                    }
                    else
                    {
                        accountVM.message = "Password incorrect!";
                    }
                }
                else
                {
                    accountVM.message = "Account is not activated!";
                }
            }
            return accountVM;

        }
        private string GenerateJSONWebToken(AccountVM account)
        {
            var secuirityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(secuirityKey, SecurityAlgorithms.HmacSha256);
            var claim = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, account.Username),
                new Claim(JwtRegisteredClaimNames.Sub, account.Password),
                new Claim(JwtRegisteredClaimNames.Sub, account.message),
            };
            var tokent = new JwtSecurityToken(
                issuer: _config["Jwt:Key"],
                audience: _config["Jwt:Issuer"],
                claim,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );


            var encodetoken = new JwtSecurityTokenHandler().WriteToken(tokent);
            return encodetoken;
        }
        
        //[HttpGet("tokent")]

        //public st([FromForm] Tokent TOKENT)
        //{
        //   // var identity = HttpContext.User.Identity as ClaimsIdentity;
        //    var identity = TOKENT.tokent;
        //    IList<Claim> claim = identity.Claims.ToList();
        //    var username = claim[0].Value;
        //    return Ok(username);
        //}




        //Delete accounts
        [HttpPut("{disable}")]
        public async Task<IActionResult> DisableAccounts([FromForm] AccountVM request)
        {
            var account = await this._context.Accounts.Where(a => a.Username == request.Username).FirstOrDefaultAsync();
            if (account==null)
            {
                return BadRequest("Account has username" + request.Username + " not exists!");
            }
            else
            {
                try
                {
                    account.isActive = false;
                    this._context.Accounts.Update(account);
                    await this._context.SaveChangesAsync();
                }
                catch (Exception err)
                {

                    return BadRequest("The account has been locked!!!");
                }
                
            }
            return Ok(account);
        }

    }
}
