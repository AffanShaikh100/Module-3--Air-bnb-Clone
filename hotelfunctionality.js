// GET USER LOCATION VARIABLE
let userlat=0
let userlng=0;

// FUNCTION FOR POP UP MODAL BOX ON HOTEL HTML PAGE

function getbookingcostbrkdwn(hotelno){
   
    // taking values from api hotel data 
    let nightprice = actualdata[hotelno].price.rate;
    let roomfee = actualdata[hotelno].price.priceItems;
   
    console.log(roomfee);
    // we have extracted the values from hotel price api
    let rvalue1="";
    let rvalue2="";
    let rvalue3="";
    let hotelrating ="";

    if(actualdata[hotelno].reviewsCount==0 || !actualdata[hotelno].rating){
      hotelrating ="5";
    }
    else{
      hotelrating = actualdata[hotelno].rating;
    }

    if(roomfee.length==2){
        rvalue1 = roomfee[0].amount;
        rvalue2 = 0;
        rvalue3 = roomfee[1].amount;
    }
    else if(roomfee.length==3){
        rvalue1 = roomfee[0].amount;
        rvalue2 = roomfee[1].amount;
        rvalue3 = roomfee[2].amount
    }
    else if(roomfee.length==4){
        rvalue1 = roomfee[0].amount;
        rvalue2 = roomfee[1].amount + roomfee[2].amount;
        rvalue3 = roomfee[3].amount
    }
    else if(roomfee.length==5){
        rvalue1 = roomfee[0].amount;
        rvalue2 = roomfee[2].amount + roomfee[3].amount;
        rvalue3 = roomfee[4].amount
    }
    let total =actualdata[hotelno].price.total ;
    
    // creation and appending of modal to hotelhtml
    let hotelmaindiv = document.getElementById("mainhotelbodydiv");

    let maindiv = document.createElement("div");
    maindiv.setAttribute("class","modalbody");
    maindiv.setAttribute("id","mainbodydiv");
    hotelmaindiv.appendChild(maindiv);

    let modaldiv = document.createElement("div");
    modaldiv.setAttribute("class","modal");
    modaldiv.innerHTML=`
                <div class="modalimg">
                    <img src="./Hotel image/logo.svg">
                    <img onclick="closemodal()" src="./Hotel image/close icon.svg">
                </div>
  
               <div class="modal-head">
                   <p><span>$${nightprice}</span>/night</p>
                   <p><img src="./Hotel image/star.svg"><span>${hotelrating}</span> (${actualdata[hotelno].reviewsCount} reviews)</p>
               </div>

               <p>Booking Cost Breakdown :</p>

               <div class="modal-body">
                  <div>
                    <p>${roomfee[0].title} : </p>
                    <p>$ ${rvalue1}</p>
                  </div>
                  <div>
                    <p>Airbnb Service fee :</p>
                    <p>$ ${rvalue2}</p>
                  </div>
                  <div>
                    <p>Occupancy taxes<br> and fees :</p>
                    <p>$ ${rvalue3}</p>
                  </div>
               </div>

               <div class="modal-footer">
                    <p>Total</p>
                    <p>$ ${total}</p>
               </div>
    `
    maindiv.appendChild(modaldiv);
    maindiv.style.display="block";
    // maindiv.classList.toggle("hidediv");
}


// FUNCTION TO CLOSE MODAL POPUP
function closemodal(){
   let closediv = document.getElementById("mainbodydiv");
   closediv.remove();
}


// LOADINGS MAPS ON SITE

// function initMap(i){

//   console.log("working");
//   console.log(centerlat, centerlong);
//    map = new google.maps.Map(document.getElementById("mapsdiv"),{
//            center: {lat: centerlat, lng: centerlong},
//            zoom: 11,
//            title: "hello"
//    });
//    new google.maps.Marker({
//     position: {lat: actualdata[i].lat, lng: actualdata[i].lng},
//     map,
//     title: "Hello World!",
//   });
// }

//main google maps function 
async function initMap(i) {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  map = new Map(document.getElementById("mapsdiv"), {
    center: { lat: centerlat, lng: centerlong },
    zoom: 10,
    mapId: "4504f8b37365c3d0",
  });
  const priceTag = document.createElement("div");

  priceTag.className = "price-tag";
  priceTag.textContent = `$ ${actualdata[i].price.rate}`;

  const marker = new AdvancedMarkerElement({
    map,
    position: { lat: centerlat, lng: centerlong },
    content: priceTag,
  });
}

// multiple marker google maps function 
async function resthotelmaps(i){
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

         const priceTag = document.createElement("div");
         priceTag.className = "price-tag";
         priceTag.textContent = `$ ${actualdata[i].price.rate}`;

         const marker = new AdvancedMarkerElement({
            map: map,
            position: { lat: actualdata[i].lat, lng: actualdata[i].lng },
            content: priceTag,
          });
}
// 
// 
// 
// 
// GETTING LOCATION OF USER AND ALSO CREATING BUTTON FUNCTION TO DIRECT TO HOTEL LOCATION

// function gives user location
function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
}
function showPosition(position){
userlat = position.coords.latitude;
console.log("working");
userlng = position.coords.longitude;
console.log(userlat, userlng);
}



// function which open new page with direction
function openDirections(i){
  let hotelurl = `https://www.google.com/maps/dir/${userlat},${userlat}/${actualdata[i].lat},${actualdata[i].lng}`;
  
  window.open(hotelurl,"_blank");
}