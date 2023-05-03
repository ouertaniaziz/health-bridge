import React, { useState } from 'react';
import { IMessage } from '../../../interfaces/Message';
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
import { Modal } from 'antd';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import ChatGPTaction from './page-action/ChatGPTaction';

const Chatgptmodal = () => {
  const [addingDoctor, setAddingDoctor] = useState(false);
  const [typing, settyping] = useState<boolean>(false);
  const openModal = () => setAddingDoctor(true);
  const [postdata, setPostData] = useState([]);
  const [messages, setmessages] = useState<IMessage[]>([
    {
      message: "hello Doctor, I'm chatgpt !",
      sender: 'ChatGPT',
      direction: 'incoming',
      position: 'normal'
    }
  ]);

  //usePageData(pageData);
  //chat
  //function
  const ProcessmessagetoChatgpt = async (chatMessages) => {
    let apiMessages: IMessage[] = chatMessages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });
    const systemMessage = {
      //  Explain things like you're talking to a software professional with 5 years of experience.
      role: 'system',
      content:
        "Hi ChatGPT, I'm a doctor and I'm looking for an explanation on a professional level. Please provide me with detailed information that would be appropriate for a medical professional. Thank you."
    };
    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    };
    console.log(apiRequestBody);
    // const [m, setm] = usePost('/patient/chat', postdata, (data) => {
    //   console.log(data);
    //   // history.replace({ pathname: '/doctor/appointments' });
    // });
    axiosInstance.post('/patient/chat', { messages: apiRequestBody.messages }).then((res) => {
      setmessages([...chatMessages, res.data.newMessage]);
      settyping(false);
    });
  };
  ///
  const Handlesend = async (message) => {
    settyping(true);

    const newMessage: IMessage = {
      message: message,
      sender: 'user',
      direction: 'outgoing',
      position: 'normal'
    };
    const newMessages: IMessage[] = [...messages, newMessage];
    //upddate our messages

    setmessages(newMessages);
    //indicator

    //process  message to chatgpt(send it to backend)

    await ProcessmessagetoChatgpt(newMessages);
  };

  //
  return (
    <div>
      <ChatGPTaction onClick={openModal} icon='icofont-contact-add' />
      <Modal
        open={addingDoctor}
        closable={false}
        onCancel={() => setAddingDoctor(false)}
        title={<h3 className='title'>Chatgpt</h3>}
        destroyOnClose
        footer={null}
        width={800}
      >
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content='ChatGPT is Typing' /> : null}
            >
              {messages.map((message, i) => {
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

export default Chatgptmodal;
