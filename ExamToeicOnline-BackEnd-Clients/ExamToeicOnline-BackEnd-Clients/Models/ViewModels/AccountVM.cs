﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Models.ViewModels
{
    public class AccountVM
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public Guid UserId { get; set; }
     
    }
}
