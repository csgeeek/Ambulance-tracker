const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;   
    return d;
}

let tlat = 17.68853, tlon = 83.16644;

// 17.773450375795733, 83.23261057145403
// 17.776309158215206, 83.21645129771152

const deg2rad = (deg) => {
    return deg * (Math.PI/180);
}

const fetchdata = async () => {
    try{
        const resp = await fetch('https://test-geoloc-api.herokuapp.com/api/v/coord', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
            },
        });
        const res = await resp.json();
        // console.log(res);
        res.map((each) => {
            const divClassName = each.uniqId;
            const divClass = '.' + divClassName;
            const dist = getDistanceFromLatLonInKm(each.latitude, each.longitude, tlat, tlon);
            let showStatus = 'In 5km range';
            // console.log(`${each.uniqId} ${each.latitude} ${each.longitude} ${dist}`);
            // console.log(`${each.uniqId} : ${tlat} ${tlon}, ${each.latitude} ${each.longitude} ${dist}`);
            // console.log(dist);
            
            if(dist > 5){
                showStatus = 'not in 5km range';
            }
            // console.log(showStatus);
            if(document.querySelector(`${divClass}`) === null){
                const element = document.createElement('div');
                element.classList.add(`${divClassName}`);
                element.classList.add('amb-loc-details');
                if(dist > 5){
                    element.classList.add('red');
                }
                else{
                    element.classList.add('green');
                }
                element.innerHTML = `<h3 class="uid">${each.uniqId}</h3><p class="dist">${dist} km</p>`;
                document.querySelector('.display').appendChild(element);
            }
            else{
                if(dist > 5){
                    document.querySelector(`${divClass}`).classList.remove('green');
                    document.querySelector(`${divClass}`).classList.add('red');
                }
                else{
                    document.querySelector(`${divClass}`).classList.remove('red');
                    document.querySelector(`${divClass}`).classList.add('green');
                }
                document.querySelector(`${divClass}`).innerHTML = `<h3 class="uid">${each.uniqId}</h3><p class="dist">${dist} km</p>`;
            }
        });
    }
    catch(err){
        console.log(err);
    }

}
   
$(document).ready(function(){
    setInterval(fetchdata, 5000);
});
// function fetchdata(){
//     $.ajax({
//         url: 'https://test-geoloc-api.herokuapp.com/api/v/coord',
//         type: 'GET',
//         success: function(res){
//             res.map((each) => {
//                 const divClassName = each.uniqId;
//                 const divClass = '.' + divClassName;
//                 if(document.querySelector(`${divClass}`) === null){
//                     const element = document.createElement('div');
//                     element.classList.add(`${divClassName}`);
//                     element.innerHTML = `<p class="status">${each.uniqId}</p><p class="lat">${each.latitude}</p><p class="lon">${each.longitude}</p><br>`;
//                     document.querySelector('.display').appendChild(element);

//                 }
//                 else{
//                     document.querySelector(`${divClass}`).innerHTML = `<p class="status">${each.uniqId}</p><p class="lat">${each.latitude}</p><p class="lon">${each.longitude}</p> <br>`;
//                 }
//             })
//         }
//     });
// }
   
// $(document).ready(function(){
//     setInterval(fetchdata, 5000);
// });