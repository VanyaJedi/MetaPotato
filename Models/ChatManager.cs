using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using MetaPotato.Models;
using Microsoft.EntityFrameworkCore;

namespace MetaPotato.Models
{
    // Элемент списка контактов
    public class ContactItem
    {
        public string FLogin;
        public string FLastMessage;
        public byte[] FPhoto;
    }

    // Элемент списка контактов
    public class MessageItem
    {
        //public string FLogin;
        //public string FLastMessage;
        //public byte[] FPhoto;
    }


    // Менеджер чата сообщений
    public class ChatManager
    {
        private UserContext FContext;
        public ChatManager(UserContext AContext)
        {
           FContext = AContext;
        }

        public List<ContactItem> BuildContactList(string ALogin)
        {
            // Это классический вариант загрузки связанных данных
            var xContacts = FContext.tblUsers.Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblChatRoom).ToList();
            // Выбор пользователя с заданным Login
            var u = xContacts.FirstOrDefault(t => ALogin == t.Login);
            // Список ChatRoom для текущего пользователя
            var cr = u.tblChatRoomUser.Select(sc => sc.tblChatRoom).ToList();

            // Формировать список контактов
            List<ContactItem> xContactList = new List<ContactItem>();
            foreach (tblChatRoom cru in cr)
            {
                if (cru.UserNumber <= 2)
                    foreach (tblChatRoomUser x in cru.tblChatRoomUser)
                    {                     
                        if (x.tblUser.Login != ALogin)
                        {
                            ContactItem xContactItem = new ContactItem();
                            xContactItem.FLogin = x.tblUser.Login;
                            xContactItem.FLastMessage = "Последнее сообщение от " + x.tblUser.Login + " (ChatRoom = " + cru.ChatRoomName + ")";
                            xContactItem.FPhoto = null;
                            xContactList.Add(xContactItem);
                            break;
                        }
                    }
                else
                {
                    ContactItem xContactItem = new ContactItem();
                    xContactItem.FLogin = cru.ChatRoomName;
                    xContactItem.FLastMessage = "Последнее сообщение " + " (ChatRoom = " + cru.ChatRoomName + ")";
                    xContactItem.FPhoto = null;
                    xContactList.Add(xContactItem);
                }
             }
            return xContactList;
        }

        public  List<MessageItem> RecieveMessages(tblChatRoom room)
        {
            try
            {
                List<MessageItem> result = new List<MessageItem>();
                var xMessages = FContext.tblMessages.OrderBy(p => p.messageId);
            //    List<tblMessage> x = (from messages in xMessages
            //                              where messages.tblTalker.ChatRoomID == room.ChatRoomID
            //                              select messages).ToList();
                return null;
            }
            catch
            {
                return null;
            }
        }

        public bool AddUserToContacts(string ALogin, string ANewUser)
        {
            // Находим наш User
            var xUser = FContext.tblUsers.Where(p => p.Login == ALogin).Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblChatRoom).ToList();
            // Выводим все tbChatRoom
            List<tblChatRoomUser> xChatRoomUsers = null;
            List<tblChatRoom> xChatRooms = new List<tblChatRoom>();
            foreach (var c in xUser)
            {
                // Находим ChatRoom данного User
                xChatRoomUsers = c.tblChatRoomUser;
                foreach (var cr in xChatRoomUsers)
                {
                    xChatRooms.Add(cr.tblChatRoom);
                    //       var xUsers = c.tblChatRoomUser.Select(sc => sc.tblUser).ToList();
                    //       foreach (tblUser user in xUsers)
                    //           if (user != null)
                    //               xAllUser = xAllUser + user.Login;
                }
            }

         //   var xChatRooms = FContext.tblChatRooms.Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblUser).ToList();
         //   if (xChatRooms.Count > 0)
            if (xChatRoomUsers != null)
                return false;
            else
                return true;
        }
    }
}
