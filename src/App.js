import React,{ useState } from 'react';
import './App.css';

function App() {
  const [input, setInput]= useState('');
  const [messages, setMessages] = useState(["hi","hey"]);
  console.log(messages);
  const sendMessage=(event)=>{
    setMessages([...messages, input]);
    setInput('');
  }
  return (
    <div className="App">
      <h1>Chat Karo</h1>
      <input value={input} onChange={e => setInput(e.target.value)}/>
      <button onClick={sendMessage}>Send Message</button>
      {
        messages.map(msg=>{
          return <h3>{msg}</h3>
        })
      }
    </div>
  );
}

export default App;
