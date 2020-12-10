using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ExamToeicOnline_BackEnd_Clients.Models.ViewModels;
using ExcelDataReader;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExamToeicOnline_BackEnd_Clients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntrosController : ControllerBase
    {
        [HttpGet]

        public async Task<IActionResult> GetIntro(string partName)
        {
            string filePath = "./File/Intro/Intro.xlsx";
            IntroVM introVM = new IntroVM();
            introVM.Anwsers = new List<string>();
            int line = 0;
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            using (var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.None))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    do
                    {
                        if (reader.Name == partName) 
                        {
                            while (reader.Read())
                            {
                                if (line == 0)
                                {
                                    line++;
                                }
                                else
                                {
                                    if (line==1)
                                    {
                                        introVM.Title = reader.GetValue(0).ToString();
                                        introVM.Description = reader.GetValue(1).ToString();
                                        introVM.Introduce = reader.GetValue(2).ToString();
                                        introVM.CorrectAnwser = reader.GetValue(3).ToString();
                                        introVM.ScriptAnwser = reader.GetValue(4).ToString();
                                    }
                                    else 
                                    {
                                        if (line ==2)
                                        {
                                            introVM.Question=reader.GetValue(2).ToString();
                                        }
                                        else
                                        {
                                            introVM.Anwsers.Add(reader.GetValue(2).ToString());
                                        }
                                    }
                                    line++;
                                }

                            }
                        }
                            

                    } while (reader.NextResult());
                   
                }
            }
            
            return Ok(introVM);
        }
    }
}
