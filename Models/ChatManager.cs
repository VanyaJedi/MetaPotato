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
    public class ChatManager
    {
        private UserContext FContext;
        public ChatManager(UserContext AContext)
        {
           FContext = AContext;
        }
        public List<tblChatRoom> BuildContactList(string ALogin)
        {
            var xContacts = FContext.tblUsers.Include(c => c.tblUserChatRoom).ThenInclude(sc => sc.tblChatRoom).ToList();
            var u = xContacts.FirstOrDefault(t => ALogin == t.Login);
            var cr = u.tblUserChatRoom.Select(sc => sc.tblChatRoom).ToList();

            return cr;
        }
    }
}
