using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace MetaPotato
{
    public class ChatHub : Hub
    {
        public async Task Send(string  message, string roomName)
        {
           await this.Clients.Group(roomName).SendAsync("Send", message, roomName);
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
