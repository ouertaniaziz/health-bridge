import React, { useState } from 'react';
import axiosInstance from '../../../config/axios';
import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator
} from '@chatscope/chat-ui-kit-react';
import PageAction from '../page-action/PageAction';
import { Modal, Button } from 'antd';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
interface IMessagechat {
  message: string;
  sender: string;
  direction: 'incoming' | 'outgoing' | 0 | 1;
  position: 'single' | 'first' | 'normal' | 'last' | 0 | 1 | 2 | 3;
}
const Chat = () => {
  const [addingDoctor, setAddingDoctor] = useState(false);
  const [typing, settyping] = useState<boolean>(false);
  const openModal = () => setAddingDoctor(true);
  const [postdata, setPostData] = useState([]);
  const [newM,setnew]=useState<IMessagechat>();
  const [messages, setmessages] = useState<IMessagechat[]>([
    {
      message:
        'hello Iam your trustworthy chatbot trained by health bridge in order to give you medical , health assisstance',
      sender: 'Health Bridge',
      direction: 'incoming',
      position: 'normal'
    }
  ]);
  const [newMessage, setmessage] = useState<IMessagechat>();
  //usePageData(pageData);

  const handlesendmessage = (message: String) => {
    axiosInstance.post('http://localhost:5000/predict', { message }).then((res) =>{
      setmessage({
        message: res.data.answer,
        sender: 'healbridge',
        direction: 'incoming',
        position: 'normal'
      })
      setmessages([...messages,newMessage])
    }
    );
    console.log(newMessage);
    setmessages([...messages,newMessage])
    
  };

  const Handlesend = async (message) => {
    settyping(true);
    console.log('fffff',message)
    let newMessage: IMessagechat = {
      message: message,
      sender: 'user',
      direction: 'outgoing',
      position: 'normal'
    };
    //upddate our messages
    setnew(newMessage)
    let newchat: IMessagechat[] = [
      ...messages,
      {
        message: message,
        sender: 'user',
        direction: 'outgoing',
        position: 'normal'
      }
    ];
        console.log('allmessages',newchat)
    setmessages(newchat);
    //indicator
    //process  message to chatgpt(send it to backend)
    //await ProcessmessagetoChatgpt(message);
    await handlesendmessage(message);
   
  };

  return (
    <div>
      <Button onClick={() => setAddingDoctor(true)}> open chat</Button>
      <Modal
        open={addingDoctor}
        closable={false}
        onCancel={() => setAddingDoctor(false)}
        title={
          <h3 className='title' style={{ textAlign: 'center' }}>
            Health bridge asisstant
          </h3>
        }
        destroyOnClose
        footer={null}
        width={800}
      >
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content='ChatGPT is Typing' /> : null}
            >
              {messages?.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder='Type Message here !' onSend={Handlesend} />
          </ChatContainer>
        </MainContainer>
      </Modal>
    </div>
  );
};
export default Chat;
