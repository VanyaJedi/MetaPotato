using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using MetaPotato.Models;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace MetaPotato.Controllers
{
   
    public class MessagesController : Controller
    {
        private ChatManager FChatManager;
        public MessagesController(ChatManager AChatManager)
        {
            
            FChatManager = AChatManager;
        }

        public string Messages(string chatRoomId)
        {
            var messages = FChatManager.RecieveMessages(User.Identity.Name, chatRoomId);
            return JsonConvert.SerializeObject(messages);
        }

        // Текущая информация при загрузке страницы
        public string InitialData()
        {
            return JsonConvert.SerializeObject(FChatManager.GetInitialData(User.Identity.Name));
        }
    }
}