import React, { useState, useRef, useEffect } from 'react';
import Rooms from './components/Rooms';
import Chat from './components/Chat';
import io, { Socket } from 'socket.io-client';
import { Layout } from 'antd';
import { IPageData } from '../../../interfaces/page';
import { usePageData } from '../../../hooks/usePage';
const Chatroom = () => {
    const pageData: IPageData = {
        title: 'Chatroom',
        fulFilled: true,
        breadcrumbs: [
          {
            title: 'Patient',
            route: 'default-dashboard'
          },
      
          {
            title: 'Chatroom'
          }
        ]
      };
      usePageData(pageData)
  const [currentRoom, setCurrentRoom] = useState({
    key: '',
    name: 'Chat'
  });
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [alert, setAlert] = useState(true);

  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io('http://localhost:3000/');

    socketRef.current.on('message', (data) => {
      setMessages((previousMessages) => {
        return [...previousMessages, data];
      });
    });

    socketRef.current.on('output-messages', (data) => {
      setMessages((previousMessages) => {
        return [...previousMessages, ...data];
      });
    });
  }, []);

  useEffect(() => {
    if (alert) {
      setAlert(false);
    }
  }, [alert]);
  return (
    <div className='App'>
      <Rooms
        alert={alert}
        setAlert={setAlert}
        socket={socketRef}
        setCurrentRoom={setCurrentRoom}
        rooms={rooms}
        setRooms={setRooms}
        messages={messages}
        setMessages={setMessages}
      />
      <Chat
        socket={socketRef}
        messages={messages}
        setMessages={setMessages}
        currentRoom={currentRoom}
      />
    </div>
  );
};

export default Chatroom;
