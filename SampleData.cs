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
            AChatManager.AddUserToContacts("Sasha", "Ivan");
            AChatManager.AddUserToContacts("Ivan", "Sasha");
        }
    }
}
