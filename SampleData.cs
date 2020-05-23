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
            if (!context.tblUsers.Any())
            {
                // заполняем tblUser
                context.tblUsers.AddRange(
                    new tblUser
                    {
                        Login = "Ваня",
                        Password = "1",
                        Email = "Ваня"
                    },
                    new tblUser
                    {
                        Login = "Андрей",
                        Password = "2",
                        Email = "Андрей"
                    },
                   new tblUser
                   {
                       Login = "Дима",
                       Password = "3",
                       Email = "Дима"
                   }
                );
                context.SaveChanges();
                AChatManager.AddUserToContacts("Ваня", "Андрей");
                AChatManager.AddUserToContacts("Ваня", "Дима");
                AChatManager.AddUserToContacts("Андрей", "Дима");

            }
        }
    }
}
