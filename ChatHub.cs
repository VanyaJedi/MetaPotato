using System;
using System.Collections;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace MetaPotato
{
    public class ChatHub : Hub
    {
        private static Hashtable FChatRommConnectionId = new Hashtable();
        [Authorize]
        public async Task Send(string  message, string roomName)
        {
            string xConnectionId = Context.ConnectionId;
            string xLogin = Context.User.Identity.Name;
            await this.Clients.OthersInGroup(roomName).SendAsync("Send", message, xLogin);
        }

        public async Task JoinGroup(string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }

        public override Task OnConnectedAsync()
        {
           return base.OnConnectedAsync();
        }

     /*   public override Task OnDisconnectedAsync(bool stopCalled)
        {
            return base.OnDisconnectedAsync(stopCalled);
        }
        */
    }
}
