import React, { useEffect } from 'react';
import Room from './Room';
import AddRoom from './AddRoom';
import './../chatscss.scss';
type Props = {
  socket: any;
  setMessages: any;
  setCurrentRoom: any;
  alert: any;
  setAlert: any;
  rooms: any;
  setRooms: any;
  messages: any;
};
const Rooms = ({
  socket,
  setMessages,
  setCurrentRoom,
  alert,
  setAlert,
  rooms,
  setRooms,
  messages
}: Props) => {
  // render all rooms
  useEffect(() => {
    const getRooms = async () => {
      const res = await fetch('http://localhost:3000/');
      const data = await res.json();
      setRooms(data);
    };
    if (rooms.length && !alert) {
      return;
    }
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms, alert]);

  return (
    <div className='side-menu'>
      <h2>All rooms</h2>
      <AddRoom alert={alert} setAlert={setAlert} />
      <div className='rooms'>
        {rooms.map((room) => (
          <Room
            socket={socket}
            key={room._id}
            messages={messages}
            setMessages={setMessages}
            roomKey={room._id}
            setCurrentRoom={setCurrentRoom}
            name={room.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
