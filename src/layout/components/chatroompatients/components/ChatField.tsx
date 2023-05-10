import React from 'react';

const ChatField = ({ socket, currentRoom }) => {
  const [inputContent, setInputContent] = React.useState<String>();
  const username = JSON.parse(localStorage.getItem('user'))?.username;

  const sendMessage = (e) => {
    e.preventDefault();
    const chatINPUT = document.getElementById('chat-1245') as HTMLInputElement | null;;
    chatINPUT.value = '';
    if (inputContent && username && currentRoom) {
      socket.current.emit('message', {
        room: currentRoom.key,
        message: inputContent,
        author: username
      });
    }
    setInputContent('');
  };
  return (
    <form className='chat-form'>
      <input
        id='chat-1245'
        type='text'
        placeholder='type your message here'
        onChange={(e) => setInputContent(e.target.value)}
      />

      <button type='submit' onClick={sendMessage}>
        Send
      </button>
    </form>
  );
};

export default ChatField;
