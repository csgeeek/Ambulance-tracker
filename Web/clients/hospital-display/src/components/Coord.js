import React from 'react'
import { hospitalLatitude, hospitalLongitude } from '../config/HospitalCoords';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Coord = ({ data }) => {
  const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
    if(lat2 === null || lon2 === null){
      return -1;
    }
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;   
    return d;
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  }

  
  let tlat = hospitalLatitude, tlng = hospitalLongitude;

  return (
    <>
      <div className={classNames(getDistanceFromLatLonInKm(tlat, tlng, data.lat, data.lng) > 3? 'border-green-800': 'border-red-900', 'border-l-4 p-4 m-2 bg-gray-200' )}>
        <h3 className='font-semibold'>Ambulance Number : <span className='font-normal'> { data.ambNumber } </span></h3>
        <h4 className='font-semibold'>Name : <span className='font-normal'> { data.name } </span></h4>
        <h4 className='font-semibold'>Description : <span className='font-normal'> { data.desc } </span></h4>
        {
          data.loaded ? <h4 className='font-semibold'>Distance : <span className='font-normal'>{Math.round(getDistanceFromLatLonInKm(tlat, tlng, data.lat, data.lng) * 100) / 100} km</span> </h4> : <p>Location not loaded</p>
        }
      </div>
    </>
  )
}

export default Coord;