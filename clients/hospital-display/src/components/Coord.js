import React from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Coord = ({ data }) => {

  const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
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

  // coords hardcoded for now
  let tlat = 17.761146480492354, tlng = 83.31641637015535;

  return (
    <>
      <div className={classNames(getDistanceFromLatLonInKm(tlat, tlng, data.lat, data.lng) > 4? 'border-green-900': 'border-red-900', 'border-l-4 p-4 m-2 bg-gray-200' )}>
        <h3>Id:- { data.id }</h3>
        <h4>Name:- { data.name }</h4>
        <p>{ getDistanceFromLatLonInKm(tlat, tlng, data.lat, data.lng) }km</p>
      </div>
    </>
  )
}

export default Coord;