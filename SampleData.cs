using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetaPotato.Models;
using Microsoft.EntityFrameworkCore;

namespace MetaPotato
{
    public  class SampleData
    {
        public static void Initialize(UserContext context, ChatManager AChatManager)
        {
            AChatManager.AddUserToContacts("Nikolay", "Nikolay1");
            AChatManager.AddUserToContacts("Nikolay", "Nikolay2");
            AChatManager.AddUserToContacts("Nikolay2", "Nikolay1");
        }
    }
}
