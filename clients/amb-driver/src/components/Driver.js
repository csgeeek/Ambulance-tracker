import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import useGeolocation from '../Hooks/useGeolocation';
import { io } from 'socket.io-client';

import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);


const ID = nanoid();

const socket = io('http://localhost:5000');

const Driver = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [ambNumber, setAmbNumber] = useState('');

  const coord = useGeolocation().coord;
  const loaded = coord.loaded;
  const latitude = coord.lat;
  const longitude = coord.lng;
  console.log(latitude, longitude);

  socket.emit('send-coords', JSON.stringify({ id: ID, ambNumber: ambNumber, name: name, loaded: loaded, lat: latitude, lng: longitude, desc: desc }));
  const populateName = async () => {
    const req = await fetch('http://localhost:5000/api/auth/name', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await req.json()
    if (data.status === 'ok') {
      setName(data.name)
      setAmbNumber(data.ambNumber)
      setDesc(data.desc)
    } else {
      alert(data.error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const driver = jwt.decode(token);
      if (!driver) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      else {
        populateName();
      }
    }
    else {
      navigate('/login');
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <>
      <div className='mt-5'>
        <h1 className='text-4xl font-extrabold text-center'>Hello {name}</h1>
        {
          latitude === null || longitude === null ? <p className='text-center mt-2'>Cannot access location</p> : <p className='text-center mt-2'>Your location is being tracked. Latitude: {latitude} Longitude: {longitude}</p>
        }
        <div className='amb'><img src="../icons/working.gif" alt="gif" /></div>
        <div className="flex justify-center">
          <button className='bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 rounded' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  )
}

export default Driver;