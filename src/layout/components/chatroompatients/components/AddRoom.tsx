import axios from 'axios';
import React, { useState } from 'react';

const AddRoom = ({ setAlert }:any) => {
  const [name, setName] = useState();
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const addRoom = async (e) => {
    e.preventDefault();
    await axios
      .post('http://localhost:3000/rooms', { roomName: name })
      .then((res) => console.log(res.data));
    setAlert(true);
  };
  return (
    <form className='room-form'>
      <input type='text' placeholder='Add room name' onChange={handleInputChange} />
      <button type='submit' onClick={addRoom}>
        Add room
      </button>
    </form>
  );
};

export default AddRoom;
