import { Button, FormControl, InputLabel ,Input} from '@material-ui/core';
import React,{ useState , useEffect} from 'react';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

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
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formcontrol">
          <InputLabel> Type your message</InputLabel>
          <Input className="app__input" value={input} onChange={e => setInput(e.target.value)}/>
          <IconButton className="app__icon" disabled ={!input} onClick={sendMessage} type="submit" color="primary" variant="outlined" className="app__button">
            <SendIcon/>
          </IconButton>
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
