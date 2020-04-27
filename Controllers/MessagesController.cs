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
        private UserContext db;
        private IHubContext<ChatHub> hubContext;
        private ChatManager chatManager;
        private class MessageItem
        {
            public string MessageText;
            public string UserName;
        }

        public MessagesController(IHubContext<ChatHub> hubContext, UserContext context)
        {
            this.hubContext = hubContext;
            db = context;
            chatManager = new ChatManager(context);
        }

        private List<MessageItem> GenerateMessages(string chatRoom)
        {
            var messageList = new List<MessageItem>
            {
                new MessageItem
                {
                    MessageText = "Privet " + "chatRoom = " + chatRoom,
                    UserName = "Vanya"
                },

                new MessageItem
                {
                    MessageText = "Poka " + "chatRoom = " + chatRoom,
                    UserName = "Sasha"
                },

                new MessageItem
                {
                    MessageText = "Privet Privet " + "chatRoom = " + chatRoom,
                    UserName = "Vanya"
                },

                new MessageItem
                {
                    MessageText = "Privet Privet Privet " + "chatRoom = " + chatRoom,
                    UserName = "Vanya"
                }
            };

            return messageList;
        }

        public string Messages(string chatRoomId)
        {
            IGroupManager groupManager = hubContext.Groups;
          //  groupManager.RemoveFromGroupAsync()
            var messages = GenerateMessages(chatRoomId);
            return JsonConvert.SerializeObject(messages);
        }
    }
}