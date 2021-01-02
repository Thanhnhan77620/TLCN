using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ExamToeicOnline_BackEnd_Clients.EF;
using ExamToeicOnline_BackEnd_Clients.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        private IConfiguration _config;
        public AccountsController(ExamToeicOnlineDBContext examToeicOnlineDBContext,  IConfiguration configuration)
        {
            this._context = examToeicOnlineDBContext;
            this._config = configuration;

        }
        //GET: get all accounts 
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            //var accounts = await this._context.Accounts.ToArrayAsync();
            var accounts = (from a in this._context.Accounts
                            select new AccountDTO() {
                                Id=a.Id,
                                Username=a.Username,
                                Password=a.Password,
                                isActive=a.isActive,
                                CreateAt=a.CreateAt
                            });
            if (accounts == null)
            {
                return NotFound("Can not found any record!");
            }
            return Ok(accounts);
        }
        //GET:get one account
        [HttpGet("{username}")]
        public async Task<IActionResult> GetByUsernam(string username)
        {
            var account = await this._context.Accounts.Where(x => x.Username==username.Trim()).FirstOrDefaultAsync();
            if (account == null)
            {
                return NotFound("Can not found account with username= "+username);
            }
            return Ok(account);
        }
        //Login
        [HttpGet("login")]
        public async Task<IActionResult> Login(string username, string password) 
        {
            
            AccountVM accountLogin = new AccountVM();
            accountLogin.Username = username;
            accountLogin.Password = password;
            IActionResult response = Unauthorized();
            var account = AuthenticateAccount(accountLogin);
            if (account.Username!=null)
            {
                accountLogin.UserId = account.UserId;
                var tokenStr = GenerateJSONWebToken(accountLogin);
                response = Ok(new { token = tokenStr });
                return Ok(response);
            }
            
            return Unauthorized("Login fail");

        }
        private AccountVM AuthenticateAccount(AccountVM accountLogin)
        {
            AccountVM accountVM=new AccountVM();      
            var account = this._context.Accounts.FirstOrDefault(x => x.Username.Equals(accountLogin.Username.Trim()));
            if (account != null && account.isActive)
            {
                if (BC.Verify(accountLogin.Password, account.Password))
                {
                    accountVM.Username = account.Username;
                    accountVM.Password = account.Password;
                    accountVM.UserId = account.UserId;
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
                new Claim(JwtRegisteredClaimNames.Sub, account.UserId.ToString()),

            };
            var tokent = new JwtSecurityToken(
                issuer: _config["Jwt:Key"],
                audience: _config["Jwt:Issuer"],
                claim,
                expires: DateTime.Now.AddMinutes(240),
                signingCredentials: credentials
            );


            var encodetoken = new JwtSecurityTokenHandler().WriteToken(tokent);
            return encodetoken;
        }
        //Change password
        [HttpPut("{username}")]
        public async Task<IActionResult> ChangePassword([FromForm] AccountVM accountVM)
        {
            var account = await this._context.Accounts.Where(a => a.Username == accountVM.Username).FirstOrDefaultAsync();
            if (account==null)
            {
                return NotFound("Can not find account "+ accountVM.Username);
            }
            else
            {
                if (BC.Verify(accountVM.Password, account.Password))
                {
                    account.Password = BC.HashPassword(accountVM.NewPassword);
                    this._context.Accounts.Update(account);
                    await this._context.SaveChangesAsync();
                    return Ok();
                }
            }
            return NotFound("Old Password Incorrect!");
        }


        //Delete accounts
        [HttpPut("block")]
        public async Task<IActionResult> DisableAccounts([FromForm] AccountVM request)
        {
            var account = await this._context.Accounts.Where(a => a.Username == request.Username).FirstOrDefaultAsync();
            if (account==null)
            {
                return NotFound("Can not found account with username= " + request.Username);
            }
            account.isActive = false;
            this._context.Accounts.Update(account);
            await this._context.SaveChangesAsync();
            return Ok("Account with username= "+ request.Username + " has been block!");
        }

    }
}
