
let hoteldiv = document.getElementById("hotel-list");
let hotelnos = document.getElementById("totalhotelnos");

let mindatevalue = document.getElementById("mindate");
let maxdatevalue = document.getElementById("maxdate");


const url = 'https://airbnb13.p.rapidapi.com/search-location?location=Paris&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0d61e3ac30msh4954e98d725cf6fp12873djsn26b3c172e064',
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
            <p class="price">$${house.price.total}<span> /night</span></p>
         </div>

       </div>
       `
       hoteldiv.appendChild(div);
   })
}



// GETTING DATA FROM HOME PAGE

// function loading(){
// // SETTING MINIMUM DATE IN INPUT TAG
// let date = new Date;
// let year = date.getFullYear();
// let month = date.getMonth();
// let day = date.getDate()
// let mindate = `${year}-${month+1}-${day}`
// mindatevalue.setAttribute("min",mindate);
// maxdatevalue.setAttribute("min",mindate);
// }
