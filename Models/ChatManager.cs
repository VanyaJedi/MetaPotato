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
            var xContacts = FContext.tblUsers.Include(c => c.tblUserChatRoom).ThenInclude(sc => sc.tblChatRoom).ToList();
            var u = xContacts.FirstOrDefault(t => ALogin == t.Login);
            var cr = u.tblUserChatRoom.Select(sc => sc.tblChatRoom).ToList();
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
    }
}
