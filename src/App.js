import { Button, FormControl, InputLabel ,Input} from '@material-ui/core';
import React,{ useState , useEffect} from 'react';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
function App() {
  const [input, setInput]= useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  useEffect(()=>{
    db.collection('messages').orderBy('timeStamp','desc').onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc=> ({id: doc.id, message:doc.data()})))
    })
  },[])
  useEffect(()=>{
    setUsername(prompt("Please type your name"));
  },[])
  const sendMessage=(event)=>{
    event.preventDefault();
    db.collection('messages').add({
      username: username,
      message: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setMessages([...messages, {username: username, message: input}]);
    setInput('');
  }
  return (
    <div className="App">
      <img src="https://www.xda-developers.com/files/2018/05/text-messaging.png" />
      <h1>Let's Connect</h1>
      <h2>{username}</h2>
      <form className="app__form">
        <FormControl>
          <InputLabel> Type your message</InputLabel>
          <Input value={input} onChange={e => setInput(e.target.value)}/>
          <Button variant="contained" color="primary" disabled={!input} type="submit" onClick={sendMessage}>Send Message</Button>
        </FormControl>
      </form>
      <FlipMove>
      {
        messages.map(({id, message})=>(
          <Message  key={id} username= {message.username} msg={message}/>
        ))
      }
      </FlipMove>
      
    </div>
  );
}

export default App;
