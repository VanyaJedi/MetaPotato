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
                context.SaveChanges();
                xFlag = true;
            }
            if (!context.tblChatRooms.Any())
            {
                // заполняем tblChatRoom
                context.tblChatRooms.Add(new tblChatRoom { ChatRoomName = "1" });
                context.tblChatRooms.Add(new tblChatRoom { ChatRoomName = "2" });
                context.tblChatRooms.Add(new tblChatRoom { ChatRoomName = "3" });
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
                //   r = context.tblChatRooms.Find(3);
                //   u.tblChatRoomUser.Add(new tblChatRoomUser { UserId = u.UserId, ChatRoomId = r.ChatRoomId });
              /*
                // Контакты второго пользователя
                u = context.tblUsers.Find(2);
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
            
            
        }
    }
}
