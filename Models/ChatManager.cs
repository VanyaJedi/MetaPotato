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
                            xContactItem.FLastMessage = GetLatest(cru.Id.ToString());
                            xContactItem.FChatRoom = cru.Id;
                            xContactItem.FPhoto = x.tblUser.Photo;
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

        // Получить сообщения из БД для AChatRoom. AMyLogin нужен для формирования признака IsFriend.
        public  List<MessageItem> RecieveMessages(string AMyLogin, string AChatRoom)
        {
            List<MessageItem> result = new List<MessageItem>();
            try
            {
                var xMessages = FDB.tblMessages.OrderBy(p => p.MessageId);
                List<tblMessage> x = (from message in xMessages
                                          where message.ChatRoom == AChatRoom
                                      select message).ToList();
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

        // Получить последнее сообщение для AChatRoom. 
        public string GetLatest(string AChatRoom)
        {
            List<tblMessage> xMessageList = (from message in FDB.tblMessages
                                             where message.ChatRoom == AChatRoom
                                             select message).ToList();
            if (xMessageList.Count > 0)
                return xMessageList[xMessageList.Count - 1].Message;
            else
                return "Список сообщений пуст";
        }

        public bool AddUserToContacts(string ALogin, string ANewUser)
        {
            bool xIsContact = false;
            // Это моя оптимизация (Связанные данные грузятся только для одного пользователя с заданным Login). Надо еще подумать
            var xSource = FDB.tblUsers.Where(p => p.Login == ALogin).Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblChatRoom).ToList();
            // Список ChatRoom для текущего пользователя
            var cr = xSource[0].tblChatRoomUser.Select(sc => sc.tblChatRoom).ToList();
            // Есть ли уже такой контакт?
            foreach (tblChatRoom cru in cr)
                foreach (tblChatRoomUser x in cru.tblChatRoomUser)
                    if (x.tblUser.Login == ANewUser)
                    {
                        xIsContact = true;
                        break;
                    }
            if (!xIsContact)
            {  
                // Здесь добавляем контакт
                var xTarget = FDB.tblUsers.Where(p => p.Login == ANewUser).Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblChatRoom).ToList();
                tblChatRoom xChatRoom = new tblChatRoom { ChatRoomName = ALogin + "_" + ANewUser, UserNumber = 2 };
                FDB.tblChatRooms.Add(xChatRoom);
                xChatRoom.tblChatRoomUser.Add(new tblChatRoomUser { UserId = xSource[0].Id, ChatRoomId = xChatRoom.Id });
                xChatRoom.tblChatRoomUser.Add(new tblChatRoomUser { UserId = xTarget[0].Id, ChatRoomId = xChatRoom.Id });
                FDB.SaveChanges();
                return true;
            }
            else
               return false;
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
