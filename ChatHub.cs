using System;
using System.Collections;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using MetaPotato.Models;

namespace MetaPotato
{
    public class ChatHub : Hub
    {
        private static Hashtable FChatRommConnectionId = new Hashtable();
        private ChatManager FChatManager;
        public ChatHub(ChatManager AChatManager)
        {
            FChatManager = AChatManager;
        }
        [Authorize]
        public async Task Send(string  message, string roomName)
        {
            string xConnectionId = Context.ConnectionId;
            string xLogin = Context.User.Identity.Name;
            await this.Clients.OthersInGroup(roomName).SendAsync("Send", message, xLogin);
            FChatManager.AddMessageToPool(message, xLogin, roomName);
        }

        public async Task JoinGroup(string roomName)
        {
            if (FChatRommConnectionId.ContainsKey(Context.ConnectionId))
                FChatRommConnectionId.Remove(Context.ConnectionId);
            FChatRommConnectionId.Add(Context.ConnectionId, roomName);
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }

        public override async Task OnConnectedAsync()
        {
           // await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            // await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            // Удаляем соединения из таблицы FChatRommConnectionId
            if (FChatRommConnectionId.ContainsKey(Context.ConnectionId))
                FChatRommConnectionId.Remove(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
