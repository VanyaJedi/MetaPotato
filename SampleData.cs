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
       // List<tblUser> cources = new List<tblUser>();
        public static void Initialize(UserContext context)
        {
            bool xFlag = false;
            if (!context.tblUsers.Any())
            {
                // заполняем tblUser
                context.tblUsers.AddRange(
                    new tblUser
                    {
                        Login = "1",
                        Password = "1",
                        Email = "1"
                    },
                    new tblUser
                    {
                        Login = "2",
                        Password = "2",
                        Email = "2"
                    },
                   new tblUser
                   {
                       Login = "3",
                       Password = "3",
                       Email = "3"
                   }
                );
              //  context.SaveChanges();
                xFlag = true;
            }
            if (!context.tblChatRooms.Any())
            {
                // заполняем tblChatRoom
                context.tblChatRooms.Add(new tblChatRoom { ChatRoomName = "1", UserNumber = 2 });
                context.tblChatRooms.Add(new tblChatRoom { ChatRoomName = "2", UserNumber = 2 });
                context.tblChatRooms.Add(new tblChatRoom { ChatRoomName = "3", UserNumber = 2 });
                context.tblChatRooms.Add(new tblChatRoom { ChatRoomName = "Группа", UserNumber = 10 });
                context.SaveChanges();
                xFlag = true;
            };
            if (xFlag)
            {
                // Контакты первого пользователя
                tblUser u1 = context.tblUsers.Find(1);
                tblUser u2 = context.tblUsers.Find(2);
                tblUser u3 = context.tblUsers.Find(3);
                tblChatRoom r = context.tblChatRooms.Find(1);
                r.tblChatRoomUser.Add(new tblChatRoomUser { UserId = u2.Id, ChatRoomId = r.Id});
                r.tblChatRoomUser.Add(new tblChatRoomUser { UserId = u1.Id, ChatRoomId = r.Id});
                tblChatRoom r2 = context.tblChatRooms.Find(2);
                r2.tblChatRoomUser.Add(new tblChatRoomUser { UserId = u3.Id, ChatRoomId = r2.Id });
                r2.tblChatRoomUser.Add(new tblChatRoomUser { UserId = u1.Id, ChatRoomId = r2.Id });
                tblChatRoom r4 = context.tblChatRooms.Find(4);
                r4.tblChatRoomUser.Add(new tblChatRoomUser { UserId = u3.Id, ChatRoomId = r4.Id });
                r4.tblChatRoomUser.Add(new tblChatRoomUser { UserId = u1.Id, ChatRoomId = r4.Id });
                r4.tblChatRoomUser.Add(new tblChatRoomUser { UserId = u2.Id, ChatRoomId = r4.Id });
                // Контакты второго пользователя
             /*   u = context.tblUsers.Find(2);
                  r = context.tblChatRooms.Find(1);
                  u.tblChatRoomUser.Add(new tblChatRoomUser { UserId = u.UserId, ChatRoomId = r.ChatRoomId });
                  r = context.tblChatRooms.Find(3);
                  u.tblChatRoomUser.Add(new tblChatRoomUser{ UserId = u.UserId, ChatRoomId = r.ChatRoomId });
                  // Контакты третьего пользователя
                  u = context.tblUsers.Find(3);
                  r = context.tblChatRooms.Find(1);
                  u.tblChatRoomUser.Add(new tblChatRoomUser { UserId = u.UserId, ChatRoomId = r.ChatRoomId });
                  r = context.tblChatRooms.Find(2);
                  u.tblChatRoomUser.Add(new tblChatRoomUser { UserId = u.UserId, ChatRoomId = r.ChatRoomId });
                  */
                context.SaveChanges();
            }
            
            var xUsers = context.tblUsers.Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblChatRoom).ToList();
            // выводим все User
            string xUsersName = "";
            string xChatRoomsName = "";
            foreach (var c in xUsers)
            {
               // Console.WriteLine($"\n Course: {c.Name}");
                xUsersName = xUsersName + "  " + c.Login;
                // выводим всех ChatRoom для данного User
                var xChatRoom = c.tblChatRoomUser.Select(sc => sc.tblChatRoom).ToList();
                foreach (tblChatRoom s in xChatRoom)
                    //Console.WriteLine($"{s.Name}");
                    xChatRoomsName = xChatRoomsName + " " + s.ChatRoomName;
            }
            var xChatRooms = context.tblChatRooms.Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblUser).ToList();

        }
    }
}
