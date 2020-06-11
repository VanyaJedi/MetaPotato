using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using MetaPotato.Models;
using System.Drawing;
using System.Drawing.Drawing2D;
using Unity.Policy;
using System.IO;
using Microsoft.EntityFrameworkCore;

namespace MetaPotato.Models
{
    // Текущая информация при загрузке страницы
    public class InitialDataItem
    {
        public string FMyLogin;
        public byte[] FPhoto;
        public List<ContactItem> ContactItems;
    }
    // Элемент списка контактов
    public class ContactItem : IComparable
    {
        public int CompareTo(object o)
        {            
          return (this.FLastDateTime < ((ContactItem)o).FLastDateTime) ? 1: 0;
        }
        public string FLogin;
        public string FLastMessage;
        public DateTime FLastDateTime;
        public int FChatRoom;
        public byte[] FPhoto;
    }

    // Элемент списка сообщений
    public class MessageItem
    {
        public string MessageText;
        public string UserName;
        public bool IsFriend;
    }


    // Менеджер чата сообщений
    public class ChatManager
    {
        private UserContext FDB;
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
                            xContactItem.FLastMessage = GetLatest(cru.Id.ToString(), out xContactItem.FLastDateTime);
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
            xContactList.Sort();
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
        public string GetLatest(string AChatRoom, out DateTime ASendDateTime)
        {
            List<tblMessage> xMessageList = (from message in FDB.tblMessages
                                             where message.ChatRoom == AChatRoom
                                             select message).ToList();
            if (xMessageList.Count > 0)
            {
                ASendDateTime = xMessageList[xMessageList.Count - 1].SendTime;
                string xVal = xMessageList[xMessageList.Count - 1].Message;
                return (xVal.Length < 30) ? xVal : xVal.Substring(0, 27) + "...";
            }
            else
            {
                ASendDateTime = new DateTime(1, 1, 1, 0, 0, 0);
                return "Список сообщений пуст";
            }
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

        // Текущая информация при загрузке страницы
        public InitialDataItem GetInitialData(string ALogin)
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
                            xContactItem.FLastMessage = GetLatest(cru.Id.ToString(), out xContactItem.FLastDateTime);
                            xContactItem.FChatRoom = cru.Id;
                            xContactItem.FPhoto = x.tblUser.Photo;
                            xContactList.Add(xContactItem);
                            break;
                        }
                    }
            }
            xContactList.Sort();
            InitialDataItem xInitialDataItem = new InitialDataItem();
            xInitialDataItem.FMyLogin = ALogin;
            xInitialDataItem.FPhoto = u.Photo;
            xInitialDataItem.ContactItems = xContactList;
            return xInitialDataItem;
        }

        /*
              public byte[] CroppedPicture(string AFileName, int AX, int AY, int AW, int AH)
              {
                  byte[] xSource = null;
                  using (BinaryReader reader = new BinaryReader(File.Open(AFileName, FileMode.Open)))
                  {
                      FileInfo file = new FileInfo(AFileName);
                      long size = file.Length;
                      xSource = reader.ReadBytes((int)size);
                      if ((AX == 0) && (AY == 0) && (AW == 0) && (AH == 0))
                          return xSource;

                      MemoryStream ms = new MemoryStream(xSource);
                      Image outputfile = Image.FromStream(ms);
                      Rectangle cropcoordinate = new Rectangle(Convert.ToInt32(AX), Convert.ToInt32(AY), Convert.ToInt32(AW), Convert.ToInt32(AH));
                      Bitmap bitmap = new Bitmap(cropcoordinate.Width, cropcoordinate.Height, outputfile.PixelFormat);
                      Graphics graphics = Graphics.FromImage(bitmap);
                      graphics.DrawImage(outputfile, new Rectangle(0, 0, bitmap.Width, bitmap.Height), cropcoordinate, GraphicsUnit.Pixel);
  
                      MemoryStream ms1 = new MemoryStream();
                      bitmap.Save(ms1, System.Drawing.Imaging.ImageFormat.Jpeg);
                      return ms1.ToArray();
                  }
              }
        */        
          public byte[] CroppedPicture(string AFileName, int AX, int AY, int AW, int AH)
          {
              byte[] xSource = null;
              using (BinaryReader reader = new BinaryReader(File.Open(AFileName, FileMode.Open)))
              {
                  FileInfo file = new FileInfo(AFileName);
                  long size = file.Length;
                  xSource = reader.ReadBytes((int)size);



                  MemoryStream ms = new MemoryStream(xSource);
                  Image inputfile = Image.FromStream(ms);
                  if ((AW == 0) && (AH == 0))
                  {
                      AW = inputfile.Width;
                      AH = inputfile.Height;
                  }
                  Rectangle cropcoordinate = new Rectangle(Convert.ToInt32(AX), Convert.ToInt32(AY), Convert.ToInt32(AW), Convert.ToInt32(AH));
                  Bitmap bitmap = new Bitmap(cropcoordinate.Width, cropcoordinate.Height, inputfile.PixelFormat);
                  Graphics graphicsIn = Graphics.FromImage(bitmap);
                  graphicsIn.DrawImage(inputfile, new Rectangle(0, 0, bitmap.Width, bitmap.Height), cropcoordinate, GraphicsUnit.Pixel);
                  MemoryStream msmid = new MemoryStream();
                  bitmap.Save(msmid, System.Drawing.Imaging.ImageFormat.Jpeg);
                  Image mid = Image.FromStream(msmid);

                  int width, height;
                  width = 100;
                  height = 100;
                  var resized = new Bitmap(width, height);
                  using (var graphics = Graphics.FromImage(resized))
                  {
                      graphics.CompositingQuality = CompositingQuality.HighSpeed;
                      graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                      graphics.CompositingMode = CompositingMode.SourceCopy;
                      graphics.DrawImage(mid, 0, 0, width, height);
                  }
                  MemoryStream ms1 = new MemoryStream();
                  resized.Save(ms1, System.Drawing.Imaging.ImageFormat.Jpeg);
                  return ms1.ToArray();
              }

              return xSource;
          }

        public void SaveBytes(Byte[] AIn, string AFileName)
        {
            using (BinaryWriter writer = new BinaryWriter(File.Open(AFileName, FileMode.Create)))
            {
                writer.Write(AIn);
            }
        }
    }
}
