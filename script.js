// REFERENCE TO ADD HOTEL DATA TO DIV
let hoteldiv = document.getElementById("hotel-list");

// GETTING THE MAIN HOTEL ARRAY FROM API 
let actualdata = [];

// VARIABLES FOR GOOGLE MAPS
let centerhotel=0;
let centerlat=0;
let centerlong=0;
let map="";

// GETTING REFERENCE FROM INPUT VALUES
let mindatehome = document.getElementById("mindate");
let maxdatehome = document.getElementById("maxdate");
let guesthome   = document.getElementById("guestnos");

// GETTING REFERENCE FROM HOTEL INPUT VALUES
let location1 = document.getElementById("mainhotel-location");
let checkinnew = document.getElementById("checkindate");
let checkoutnew = document.getElementById("checkoutdate");
let guestnew = document.getElementById("mainguestnos");

// FUNCTION TO SHOW DATE INPUT AT HOME PAGE
function showhomedateinput(){
   let input1 = document.getElementById("homedatetext1");
   let input2 = document.getElementById("homedatetext2");
   input1.style.display="none";
   input2.style.display="none";
   mindatehome.style.display="block";
   maxdatehome.style.display="block";
}

// SETTING UP MINIMUM VALUE IN DATE INPUT OF HOME & HOTEL PAGE HTML

function fixedmindate(){
   // SETTING MINIMUM DATE IN INPUT TAG
   let date = new Date;
   let year = date.getFullYear();
   let month = date.getMonth();
   let day = date.getDate()
   let mindate = `${year}-${month+1}-${day}`;
   mindatehome.setAttribute("min",mindate);
   maxdatehome.setAttribute("min",mindate);
}

function fixedminhotelpagedate(){
   let date = new Date;
   let year = date.getFullYear();
   let month = date.getMonth();
   let day = date.getDate()
   let mindate = `${year}-${month+1}-${day}`;
   checkinnew.setAttribute("min",mindate);
   checkoutnew.setAttribute("min",mindate);
}

// SAVING INPUT DATA TO LOCAL MEMORY TO ACCESS ON HOTEL HTML FILE

function getinputdetails(){
  
   let location = document.getElementById("roomlocation").value;
   // Checking if input are correct or not
   if(location.value !="" && mindatehome.value !="" && maxdatehome.value !=""&& guesthome.value !=""){
      // saving input values from homepage to local storage
      localStorage.setItem("hotel-location",location);
      localStorage.setItem("mindate",mindatehome.value);
      localStorage.setItem("maxdate",maxdatehome.value);
      localStorage.setItem("guest",guesthome.value);

      // taking anchor tag reference to linked hotel html file
      let anchortag = document.getElementById("homeanchortag");
      anchortag.setAttribute("href","./hotels.html");
      // let imgtag = document.getElementById("homepagelink");
      // anchortag.appendChild(imgtag);
   }
   else{
      alert("Pleast input all the values before checking available hotel list");
   }
   
}
// 
// 
// 
// 
// 
//   BELOW IS THE FUNCTION WHICH RUNS WHEN NAVIGATING FROM HOME PAGE
//   TO HOTEL PAGE
// 
// 
// 
function hoteldataload(){

   // Getting data from local memory
      let locationdata = localStorage.getItem("hotel-location");
      let fromdatedata = localStorage.getItem("mindate");
      let todatedata   = localStorage.getItem("maxdate");
      let guestdata    = localStorage.getItem("guest");

   location1.value = locationdata;
   checkinnew.value = fromdatedata;
   checkoutnew.value = todatedata;
   guestnew.value = guestdata;
   
   
   // API DETAILS OF AIRBNB CLONE
   const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location1.value}&checkin=${checkinnew.value}&checkout=${checkoutnew.value}&adults=${guestnew.value}&children=0&infants=0&pets=0&page=1&currency=USD`;
   const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9715c91b6fmsh5f124dd6e978356p1a4387jsn876de12368b6',
		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
	}
};

async function airbnbapi(){
try {
	const response = await fetch(url, options);
	const result = await response.json();
	 console.log(result.results);
    // Calling function from promise
    hotellist(result.results);
    } catch (error) {
	console.error(error);
}

}

airbnbapi();

function hotellist(hoteldata){
 
   actualdata = hoteldata;

   hoteldiv.innerHTML=" ";
   //  adding heading tag before loading hotel list
    let hotelnos = hoteldata.length;

   // variable for google maps details 
    centerhotel = hotelnos/2;
    centerlat = hoteldata[centerhotel].lat;
    centerlong = hoteldata[centerhotel].lng;


    let heading3 = document.createElement("h3");
    heading3.textContent=`${hotelnos}+ stays in ${locationdata}`;
    hoteldiv.appendChild(heading3);

    let hotelrating ="";
   hoteldata.forEach((house,i)=>{
     
       let div = document.createElement("div");
       div.setAttribute("class","hotel");

       //   just checking whether the hotel have any rating or not before loading
       if(house.reviewsCount==0 || !house.rating){
         hotelrating ="5";
       }
       else{
         hotelrating = house.rating;
       }

       div.innerHTML=`
       <div class="hotelthumbnail">
         <img src=${house.images[0]} alt="Hotel Photo loading">
       </div>

       <div class="hoteldetails">

          <div class="hotel-part1">
            <div>
                <p class="subhotelheading">${house.city}</p>
                <h1>${house.name}</h1>
                <p class="subhotelheading">Location: ${house.address}</p>
             </div>
             <div>
                <img src="./Hotel image/heart.svg">
             </div>
           </div>
       
           <div class="roomdetails">
              <div>
                <img src="./Hotel image/Divider.svg">
                <p><span>${house.persons} guests</span>·<span>${house.bedrooms} Bedrooms</span>·<span>${house.beds} Beds</span>·<span>${house.bathrooms} Bathroom</span></p>
                <p><span>${house.type}</span>·<span>${house.previewAmenities[0]}</span>·<span>${house.previewAmenities[1]}</span></p>
                <img src="./Hotel image/Divider.svg">
              </div>
              <div>
                 <button onclick="openDirections(${i})">Get Directions</button>
              </div>
            </div>
         
         <div class="hotel-ratingdiv">
            <p class="ratings"><span>${hotelrating}</span><img src="./Hotel image/star.svg"><span>(${house.reviewsCount} reviews)</span></p>
            <button id="breakprice" onclick="getbookingcostbrkdwn(${i})" class="price">$${house.price.rate}<span>/night</span></button>
         </div>

       </div>
       `
       hoteldiv.appendChild(div);

      //  Adding maps marker details
      if(centerhotel==i){
         initMap(i);
      }
      else{
         resthotelmaps(i);
      }
   })
}

localStorage.clear();
}

// FUNCTION TO DISPLAY DATE IN NAV BAR OF HOTEL PAGE

function datedisplay(){
   let showbookedday =document.getElementById("bookingdays");
   const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

   let date1 = new Date(checkinnew.value);
   let day1 = date1.getDate();
   let month1 = (months[date1.getMonth()]).slice(0,3);
   
   let date2 = new Date(checkoutnew.value);
   let day2 = date2.getDate();
   let month2 = (months[date2.getMonth()]).slice(0,3);
   
   if(month1==month2){
      let ans1 = `${day1} - ${day2} ${month1} `;
      showbookedday.value = ans1;
   }
   else{
      let ans1 = `${day1} ${month1} - ${day2} ${month2}`;
      showbookedday.value = ans1;
   }
   
}

// FUNCTION TO POP UP DATE INPUTS AT HOTEL HTML FILE

function datedivpopup(){
   let maindatediv = document.getElementById("hiddendatediv");
   maindatediv.style.display="block";

   let textdate = document.getElementById("bookingdays");
   textdate.style.display = "none";
}
// 
// 
// 
// 
// 
//  FUNCTION TO DISPLAY HOTEL LIST WHILE SEARCHING ON HOTEL HTML PAGE
// 
// 
// 
//
function getsearchhotels(){

   let inp1 = location1.value;
   let inp2 = checkinnew.value;
   let inp3 = checkoutnew.value;
   let inp4 = guestnew.value;
 
    // API DETAILS OF AIRBNB CLONE
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${inp1}&checkin=${inp2}&checkout=${inp3}&adults=${inp4}&children=0&infants=0&pets=0&page=1&currency=USD`;
    const options = {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': '9715c91b6fmsh5f124dd6e978356p1a4387jsn876de12368b6',
		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
	}
 };
 
 async function airbnbapi(){
 try {
    const response = await fetch(url, options);
    const result = await response.json();
     console.log(result.results);
     // Calling function from promise
     hotellist(result.results);
     } catch (error) {
    console.error(error);
 }
 
 }
 
 airbnbapi();
 
 function hotellist(hoteldata){

   actualdata = hoteldata;
   

    hoteldiv.innerHTML=" ";
   //  adding heading tag before loading hotel list
    let hotelnos = hoteldata.length;
    
    // variable for google maps details 
    centerhotel = hotelnos/2;
    centerlat = hoteldata[centerhotel].lat;
    centerlong = hoteldata[centerhotel].lng;


    let heading3 = document.createElement("h3");
    heading3.textContent=`${hotelnos}+ stays in ${inp1}`;
    hoteldiv.appendChild(heading3);

    let hotelrating ="";
    hoteldata.forEach((house,i)=>{
       
        let div = document.createElement("div");
        div.setAttribute("class","hotel");
         
      //   just checking whether the hotel have any rating or not before loading
        if(house.reviewsCount==0 || !house.rating){
         hotelrating ="5";
       }
       else{
         hotelrating = house.rating;
       }

        div.innerHTML=`
        <div class="hotelthumbnail">
          <img src=${house.images[0]} alt="Hotel Photo loading">
        </div>
 
        <div class="hoteldetails">
 
           <div class="hotel-part1">
             <div>
                 <p class="subhotelheading">${house.city}</p>
                 <h1>${house.name}</h1>
                 <p class="subhotelheading">Location: ${house.address}</p>
              </div>
              <div>
                 <img src="./Hotel image/heart.svg">
              </div>
            </div>
        
          <div class="roomdetails">
             <div>
               <img src="./Hotel image/Divider.svg">
               <p><span>${house.persons} guests</span>·<span>${house.bedrooms} Bedrooms</span>·<span>${house.beds} Beds</span>·<span>${house.bathrooms} Bathroom</span></p>
               <p><span>${house.type}</span>·<span>${house.previewAmenities[0]}</span>·<span>${house.previewAmenities[1]}</span></p>
               <img src="./Hotel image/Divider.svg">
             </div>
             <div>
                <button onclick="openDirections(${i})">Get Directions</button>
             </div>
          </div>
          
          <div class="hotel-ratingdiv">
             <p class="ratings"><span>${hotelrating}</span><img src="./Hotel image/star.svg"><span>(${house.reviewsCount} reviews)</span></p>
             <button id="breakprice" onclick="getbookingcostbrkdwn(${i})" class="price">$${house.price.rate}<span>/night</span></button>
          </div>
 
        </div>
        `
        hoteldiv.appendChild(div);

      // Adding Maps marker of every hotel to googlemaps
      //   if(centerhotel==i){
      //      initMap(i);
      //   }
      //   else{
      //    new google.maps.Marker({
      //       position: {lat: actualdata[i].lat, lng: actualdata[i].lng},
      //       map: map,
      //       title: "Hello World!",
      //     });
      //   }
      if(centerhotel==i){
         initMap(i);
      }
      else{
         resthotelmaps(i);
      }
    })
 }
 
    let maindatediv = document.getElementById("hiddendatediv");
    maindatediv.style.display="none";
 
    datedisplay();
    let textdate = document.getElementById("bookingdays");
    textdate.style.display = "block";

    getLocation();
}
