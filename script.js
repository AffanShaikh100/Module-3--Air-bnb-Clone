// REFERENCE TO ADD HOTEL DATA TO DIV
let hoteldiv = document.getElementById("hotel-list");

// GETTING REFERENCE FROM INPUT VALUES
let mindatehome = document.getElementById("mindate");
let maxdatehome = document.getElementById("maxdate");
let guesthome   = document.getElementById("guestnos");

// GETTING REFERENCE FROM HOTEL INPUT VALUES
let location1 = document.getElementById("mainhotel-location");
let checkinnew = document.getElementById("checkindate");
let checkoutnew = document.getElementById("checkoutdate");
let guestnew = document.getElementById("mainguestnos");


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
   localStorage.setItem("hotel-location",location);
   localStorage.setItem("mindate",mindatehome.value);
   localStorage.setItem("maxdate",maxdatehome.value);
   localStorage.setItem("guest",guesthome.value);
}


// LOADING HOTEL DATA ON HOTEL HTML PAGE MAIN FUNCTION

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
		'X-RapidAPI-Key': 'dad6ff3c41msh90f2898c626adacp1c9baejsn1d933e89f927',
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
 
   hoteldiv.innerHTML=" ";
   
   hoteldata.forEach((house)=>{
   
       let div = document.createElement("div");
       div.setAttribute("class","hotel");

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
            <img src="./Hotel image/Divider.svg">
            <p><span>${house.persons} guests</span>·<span>${house.bedrooms} Bedrooms</span>·<span>${house.beds} Beds</span>·<span>${house.bathrooms} Bathroom</span></p>
            <p><span>${house.type}</span>·<span>${house.previewAmenities[0]}</span>·<span>${house.previewAmenities[1]}</span></p>
            <img src="./Hotel image/Divider.svg">
         </div>
         
         <div class="hotel-ratingdiv">
            <p class="ratings"><span>${house.rating}</span><img src="./Hotel image/star.svg"><span>(${house.reviewsCount} reviews)</span></p>
            <p class="price">$${house.price.rate}<span> /night</span></p>
         </div>

       </div>
       `
       hoteldiv.appendChild(div);
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
   
   let ans1 = `${day1} ${month1} - ${day2} ${month2} `;
   console.log(ans1);
   showbookedday.value = ans1;
}


// FUNCTION TO POP UP DATE INPUTS AT HOTEL HTML FILE

function datedivpopup(){
   let maindatediv = document.getElementById("hiddendatediv");
   maindatediv.style.display="block";

   let textdate = document.getElementById("bookingdays");
   textdate.style.display = "none";
}



// FUNCTION TO DISPLAY HOTEL LIST WHILE SEARCHING ON HOTEL HTML PAGE

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
		'X-RapidAPI-Key': 'dad6ff3c41msh90f2898c626adacp1c9baejsn1d933e89f927',
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

// airbnbapi();

function hotellist(hoteldata){
 
   hoteldiv.innerHTML=" ";
   
   hoteldata.forEach((house)=>{
   
       let div = document.createElement("div");
       div.setAttribute("class","hotel");

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
            <img src="./Hotel image/Divider.svg">
            <p><span>${house.persons} guests</span>·<span>${house.bedrooms} Bedrooms</span>·<span>${house.beds} Beds</span>·<span>${house.bathrooms} Bathroom</span></p>
            <p><span>${house.type}</span>·<span>${house.previewAmenities[0]}</span>·<span>${house.previewAmenities[1]}</span></p>
            <img src="./Hotel image/Divider.svg">
         </div>
         
         <div class="hotel-ratingdiv">
            <p class="ratings"><span>${house.rating}</span><img src="./Hotel image/star.svg"><span>(${house.reviewsCount} reviews)</span></p>
            <p class="price">$${house.price.rate}<span>/night</span></p>
         </div>

       </div>
       `
       hoteldiv.appendChild(div);
   })
}

   let maindatediv = document.getElementById("hiddendatediv");
   maindatediv.style.display="none";

   datedisplay();
   let textdate = document.getElementById("bookingdays");
   textdate.style.display = "block";

}
