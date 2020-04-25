import * as signalR from '@microsoft/signalr';

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chat")
    .build();

export default hubConnection;
