using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace MetaPotato.Controllers
{
   
    public class MessagesController : Controller
    {
        private class MessageItem
        {
            public string MessageText;
            public string UserName;
        }

        private List<MessageItem> GenerateMessages()
        {
            var messageList = new List<MessageItem>
            {
                new MessageItem
                {
                    MessageText = "Privet",
                    UserName = "Vanya"
                },

                new MessageItem
                {
                    MessageText = "Poka",
                    UserName = "Sasha"
                },

                new MessageItem
                {
                    MessageText = "Privet Privet",
                    UserName = "Vanya"
                },

                new MessageItem
                {
                    MessageText = "Privet Privet Privet",
                    UserName = "Vanya"
                }
            };

            return messageList;
        }

        public string Messages(string chatRoomId)
        {
            var messages = GenerateMessages();
            return JsonConvert.SerializeObject(messages);
        }
    }
}