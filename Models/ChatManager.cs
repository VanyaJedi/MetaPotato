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
        public int FChatRoom;
        public byte[] FPhoto;
    }

    // Элемент списка контактов
    public class MessageItem
    {
        public string MessageText;
        public string UserName;
        public bool IsFriend;
    }


    // Менеджер чата сообщений
    public class ChatManager
    {
        private static UserContext FDB;
        public ChatManager(UserContext ADB)
        {
            FDB = ADB;           
        }

        // Построить список контактов
        public  List<ContactItem> BuildContactList(string ALogin)
        {
            // Это классический вариант загрузки связанных данных
            var xContacts = FDB.tblUsers.Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblChatRoom).ToList();
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
                            xContactItem.FChatRoom = cru.Id;
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

        // Получить сообщения из БД
        public  List<MessageItem> RecieveMessages(string AMyLogin, string AChatRoom)
        {
            List<MessageItem> result = new List<MessageItem>();
            try
            {
                var xMessages = FDB.tblMessages.OrderBy(p => p.MessageId);
                List<tblMessage> x = (from messages in xMessages
                                          where messages.ChatRoom == AChatRoom
                                      select messages).ToList();
                if (x != null)
                {
                    int xBeg = (x.Count > 5) ? x.Count - 5 : 0;
                    for (int i = xBeg; i < x.Count; i++)
                    {
                        MessageItem xMessageItem = new MessageItem();
                        xMessageItem.MessageText = x[i].Message;
                        xMessageItem.UserName = x[i].User;
                        xMessageItem.IsFriend = (AMyLogin != x[i].User);
                        result.Add(xMessageItem);
                    }
                }

                return result;
            }
            catch
            {
                return result;
            }
        }

        public bool AddUserToContacts(string ALogin, string ANewUser)
                {

            // Это классический вариант загрузки связанных данных
            var xContacts = FDB.tblUsers.Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblChatRoom).ToList();
            // Выбор пользователя с заданным Login
            // var u = xContacts.FirstOrDefault(t => ALogin == t.Login);
            // Получение его ChatRoom - ов
            //  var cr = u.tblUserChatRoom.Select(sc => sc.tblChatRoom).ToList();
            // Это моя оптимизация (Связанные данные грузятся только для одного пользователя с заданным Login). Надо еще подумать
            var u = FDB.tblUsers.Where(p => p.Login == ALogin).Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblChatRoom).ToList();
            var cr = u[0].tblChatRoomUser.Select(sc => sc.tblChatRoom).ToList();

            /*
            // Находим наш User
            var xUser = FDB.tblUsers.Where(p => p.Login == ALogin).Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblChatRoom).ToList();
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
                */
            return true;
        }

        // Сохранить сообщение в БД
        public bool AddMessageToPool(string message, string user, string chatRoom)
        {
            tblMessage xMessage = new tblMessage();
            xMessage.Message = message;
            xMessage.User = user;
            xMessage.ChatRoom = chatRoom;
            xMessage.SendTime = DateTime.Now;
            FDB.tblMessages.Add(xMessage);
            FDB.SaveChanges();
            return true;
        }
    }
}
