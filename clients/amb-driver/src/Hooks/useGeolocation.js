import { useState, useEffect } from 'react';

const useGeolocation = () => {

  const [location, setLocation] = useState({
    coord:{    
      loaded: false,
      lat: null,
      lng: null
    }
  });

// learn more about useEffect
  useEffect(() => {
    const success = (pos) => {
      const crd = pos.coords;
      setLocation({
        coord:{
          loaded: true,
          lat: crd.latitude,
          lng: crd.longitude
        }
      });
    };

    const error = (err) => {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 2000,
    };

    const id = navigator.geolocation.watchPosition(success, error, options);

    return () => {
      navigator.geolocation.clearWatch(id);
    }
  }, []);
  
  return location;
}

export default useGeolocation;