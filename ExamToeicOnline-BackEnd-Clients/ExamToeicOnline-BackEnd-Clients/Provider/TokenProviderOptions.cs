using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamToeicOnline_BackEnd_Clients.Provider
{
    public class TokenProviderOptions
    {
        public string Path { get; set; }//config endpoint.

        public TimeSpan Expiration { get; set; } = TimeSpan.FromDays(+1); // config expired date of token.

        public SigningCredentials SigningCredentials { get; set; }// config "Credential": serect key để decrypt và encrypt Token.
    }
}
