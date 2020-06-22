using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace MetaPotato
{
    public class AuthOptions
    {
        public const string ISSUER = "AuthServer"; // издатель токена
        public const string AUDIENCE = "AuthClient"; // потребитель токена
        const string KEY = "metapotatokey123";   // ключ для шифрации
        public const int LIFETIME = 1; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
