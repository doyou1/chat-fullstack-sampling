import { useState } from 'react'
import SockJsClient from 'react-stomp';
const SOCKET_URL = 'http://localhost:8080/ws-message';

function App() {
  const [message, setMessage] = useState('You server message here.');
  const onConnected = () => {
    console.log("Connected!!")
  }

  const onMessageReceived = (msg) => {
    setMessage(msg.message);
  }
return (
  <div>
     <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <div>{message}</div>
  </div>
)
}

export default App
