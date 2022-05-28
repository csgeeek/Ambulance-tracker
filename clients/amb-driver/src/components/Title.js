import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import useGeolocation from '../Hooks/useGeolocation';
import { io } from 'socket.io-client';

import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 8); 


const ID = nanoid();

const socket = io('https://socket-test-ws.herokuapp.com/');
// const socket = io('http://localhost:5000');

const Title = () => {
  
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const latitude = useGeolocation().lat;
  const longitude = useGeolocation().lng;

  
  socket.emit('send-coords', JSON.stringify({id: ID, name: name, lat: latitude, lng: longitude}));
  // socket.on("connect_error", (err) => {
  //   console.log(`connect_error due to ${err.message}`);
  // });

  const populateName = async () => {
		const req = await fetch('https://auth-server-ws.herokuapp.com/api/auth/name', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setName(data.name)
		} else {
			alert(data.error)
		}
	}

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      const driver = jwt.decode(token);
      if(!driver){
        localStorage.removeItem('token');
        navigate('/login');
      }
      else{
        populateName();
      }
    }
    else{
      navigate('/login');
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <>
      <div className='App-header'>
        <h1>Ambulance</h1>
        <p>{latitude}, {longitude}</p>
        <button className='btn' onClick={handleLogout}>Logout</button>
      </div>
    </>
  )
}

export default Title;