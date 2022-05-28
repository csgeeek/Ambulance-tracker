import './App.css';
import { useState } from 'react';
import { io } from 'socket.io-client';
import Coords from './components/Coords';

// const socket = io('https://socket-test-ws.herokuapp.com/');
const socket = io('http://localhost:5000');

function App() {

  const [coords, setCoords] = useState([]);

  socket.on('reply', (datum) => {
    const parsedData = JSON.parse(datum);
    setCoords(prev => {

      let index = prev.length;
      let part1 = prev.slice(0, index);
      let part2 = prev.slice(index);

      prev.map(coord => {
        if (coord.id === parsedData.id) {
          index = prev.indexOf(coord);
          part1 = prev.slice(0, index);
          part2 = prev.slice(index + 1);
        }
        return null;
      });

      return [...part1, parsedData, ...part2];
    });
  });

  socket.on('disconnect-client', (uniqid) => {
    setCoords(prev => {
      return prev.filter(coord => coord.id !== uniqid);
    });
  })

  const sendID = () => {
    console.log('ID sent');
    socket.emit('send-id', socket.id);
  }
  return (
    <div className="App">
      <div className="App-header">
        <button className='submit-btn' onClick={sendID}>SendID</button>
      </div>

      <Coords coords={coords} />

    </div>
  );
}

export default App;
