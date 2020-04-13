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

    // Элемент списка сообщений
    public class MessageItem
    {
        //public string FLogin;
        //public string FLastMessage;
        //public byte[] FPhoto;
    }
    // Менеджер чата сообщений
    public class ChatManager
    {
        public string FTest { get; set; }
        private UserContext FContext;
        public ChatManager(UserContext AContext)
        {
           FContext = AContext;
        }

        //Построить список контактов для текущего Login
        /*  public List<ContactItem> BuildContactList(string ALogin)
          {
              // Это классический вариант загрузки связанных данных
            //  var xContacts = FContext.tblUsers.Include(c => c.tblUserChatRoom).ThenInclude(sc => sc.tblChatRoom).ToList();
              // Выбор пользователя с заданным Login
            // var u = xContacts.FirstOrDefault(t => ALogin == t.Login);
              // Получение его ChatRoom - ов
            //  var cr = u.tblUserChatRoom.Select(sc => sc.tblChatRoom).ToList();
              // Это моя оптимизация (Связанные данные грузятся только для одного пользователя с заданным Login). Надо еще подумать
              var u = FContext.tblUsers.Where(p => p.Login == ALogin).Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblChatRoom).ToList();
              var cr = u[0].tblChatRoomUser.Select(sc => sc.tblChatRoom).ToList();
              // Формировать список контактов
              List<ContactItem> xContactList = new List<ContactItem>();
              ContactItem xContactItem = null;
              foreach (tblChatRoom s in cr)
              {
                  xContactItem = new ContactItem();
                  xContactItem.FLogin = s.ChatRoomName;
                  xContactItem.FLastMessage = "Последнее сообщение от " + s.ChatRoomName;
                  xContactItem.FPhoto = null;
                  xContactList.Add(xContactItem);
              }
              return xContactList;
          }
          */

        public List<ContactItem> BuildContactList(string ALogin)
        {
            /* var courses = db.Courses.Include(c => c.StudentCourses).ThenInclude(sc => sc.Student).ToList();
             // выводим все курсы
             foreach (var c in courses)
             {
                 Console.WriteLine($"\n Course: {c.Name}");
                 // выводим всех студентов для данного курса
                 var students = c.StudentCourses.Select(sc => sc.Student).ToList();
                 foreach (Student s in students)
                     Console.WriteLine($"{s.Name}");
             }
             */
            // Список всех tblChatRoom
            //  var xChatRooms = FContext.tblChatRooms.Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblUser).ToList();
            //  string xAllUser = "";
            // Выводим все tbChatRoom
            //  foreach (var c in xChatRooms)
            //  { + c.ChatRoomName;
            // Выводим всех User-ов данного C
            //      xAllUser = xAllUser + " User: "hatRoom
            //      var xUsers = c.tblChatRoomUser.Select(sc => sc.tblUser).ToList();
            //      foreach (tblUser user in xUsers)
            //////         if (user != null)
            //              xAllUser = xAllUser + user.Login;
            //  }
            //  var xUsers = c.tblChatRoomUser.Select(sc => sc.tblUser).ToList();
           // var xUsers = FContext.tblUsers;
            // Это классический вариант загрузки связанных данных
            var xContacts = FContext.tblUsers.Include(c => c.tblChatRoomUser).ThenInclude(sc => sc.tblChatRoom).ToList();
            // Выбор пользователя с заданным Login
            var u = xContacts.FirstOrDefault(t => ALogin == t.Login);
          //  var x = u.tblChatRoomUser;
            // Получение его ChatRoom - ов
         //   var cr = u.tblChatRoomUser.Select(sc => sc.tblChatRoom).ToList();

            // Формировать список контактов
            List<ContactItem> xContactList = new List<ContactItem>();
            ContactItem xContactItem = null;
            foreach (tblChatRoomUser s in u.tblChatRoomUser)
            {
                xContactItem = new ContactItem();
                xContactItem.FLogin = s.tblUser.Login;
                xContactItem.FLastMessage = "Последнее сообщение от " + s.tblUser.Login;
                xContactItem.FPhoto = null;
                xContactList.Add(xContactItem);
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
