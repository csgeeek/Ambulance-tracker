import React from 'react'
import { useState } from 'react';

const SendName = ({ onSend }) => {

  const [name, setName] = useState('');

  const onSendEvent = (e) => {
    e.preventDefault();
    onSend(name);
    setName('');
  }

  const handleChange = (e) => {
    setName(e.target.value);
  }

  return (
    <div>
        <form onSubmit={onSendEvent}>
          <input type="text" className="txt-field" value={name} placeholder="Enter name" onChange={handleChange} />
          <input type="Submit" className='submit-btn' />
        </form>
    </div>
  )
}

export default SendName;