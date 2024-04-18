import { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs';
const SOCKET_URL = 'ws://localhost:8080/ws-message';

function App() {
  const [message, setMessage] = useState('You server message here.');
  useEffect(() => {
    const client = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("Connected");
        client.subscribe("/topic/message", (msg) => {
          if (msg.body) {
            const jsonBody = JSON.parse(msg.body);
            if (jsonBody.message) {
              setMessage(jsonBody.message);
            }
          }
        })
      },
      onDisconnect: () => {
        console.log("Disconnected!!");
      }
    });

    client.activate();
  }, []);

return (
  <div>
      <div>{message}</div>
  </div>
)
}

export default App
