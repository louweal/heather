((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l] ? console.warn(p + " only loads once. Ignoring:", g) : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({ key: "AIzaSyAE_N9EHsQ5QvJ-ZyaBBlaWJW2K5lYNznA", v: "beta" });

// import Vue from "vue";
// import { Loader } from "@googlemaps/js-api-loader";

// const loader = new Loader({
//   apiKey: "",
//   version: "weekly",
//   libraries: ["places"],
// });

// const mapOptions = {
//   center: {
//     lat: 0,
//     lng: 0,
//   },
//   zoom: 4,
// };

// Vue.use(Loader);

// let map = null;
// let gmaps_markers = [];
// let currentLocation = null;
// let overrideLocation = null;
// let maxDistance = 120;
// let zoom = Math.log2(40000 / (maxDistance / 2)); // magic...

// function getCurrentLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       currentLocation = position;
//       handleLocationData();
//     });
//   }
// }

// function handleLocationData(removeFurther) {
//   // console.log("handle location data");

//   const removeFurtherLocations = false; //removeFurther ? true : false;
//   let hiddenMarkers = [];
//   if (currentLocation || overrideLocation) {
//     document.querySelectorAll(".partner-item").forEach((element) => {
//       let lat = element.getAttribute("data-lat");
//       let lng = element.getAttribute("data-lng");

//       let currentPostition = null;
//       if (currentLocation !== null) {
//         currentPostition = new google.maps.LatLng(currentLocation.coords.latitude, currentLocation.coords.longitude);
//         map.setCenter(currentPostition);
//       }
//       if (overrideLocation !== null) {
//         currentPostition = new google.maps.LatLng(overrideLocation.lat, overrideLocation.lng);
//         map.setCenter(overrideLocation);
//       }

//       let destination = new google.maps.LatLng(lat, lng);

//       // console.log("currentPosition:" + currentPostition);
//       // console.log("destination: " + destination);
//       if (currentPostition !== null) {
//         let distance = google.maps.geometry.spherical.computeDistanceBetween(currentPostition, destination);
//         if (distance) {
//           let distanceInKm = Math.round(distance / 1000);
//           element.setAttribute("data-distance", distanceInKm);
//           element.getElementsByClassName("distance")[0].innerHTML = distanceInKm + "km";
//           // console.log(removeFurtherLocations);
//           // if (removeFurtherLocations === true) {
//           let chosenDistance = parseInt(document.querySelector("#km").value);
//           if (distanceInKm > chosenDistance) {
//             element.style.display = "none";
//             // hiddenMarkers.push(parseInt(element.getAttribute('data-partnerid')));
//           } else {
//             element.style.display = "block";
//           }
//           // } else {
//           //     element.style.display = 'block';
//           // }
//         }
//       } else {
//         element.getElementsByClassName("distance")[0].innerHTML = "";
//         hiddenMarkers = [];
//         element.style.display = "block";
//         element.setAttribute("data-distance", "none");
//       }
//     });
//   } else {
//     document.querySelectorAll(".partner-item").forEach((element) => {
//       element.getElementsByClassName("distance")[0].innerHTML = "";
//       hiddenMarkers = [];
//       element.style.display = "block";
//       element.setAttribute("data-distance", "none");
//     });
//   }
//   sortPartners("#partner-container-desktop");
//   // handleMarkers(hiddenMarkers);
// }

// function sortPartners(containerSelector, reverse) {
//   const container = document.querySelector(containerSelector);
//   const order = reverse ? -1 : 1;

//   Array.from(container.children)
//     .sort((a, b) => (parseInt(a.dataset.distance) < parseInt(b.dataset.distance) ? -1 : 1))
//     .forEach((element) => container.appendChild(element));
// }

// function debounce(callback, wait) {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(function () {
//       callback.apply(this, args);
//     }, wait);
//   };
// }

// function handlePartnerClick(partner_id) {
//   gmaps_markers.forEach((element) => {
//     if (element.partner_id === partner_id) {
//       google.maps.event.trigger(element, "click");
//       return;
//     }
//   });
// }

// document.addEventListener("input", function (event) {
//   if (event.target.id === "km") {
//     let value = document.querySelector("#searchPartner").value;
//     if (value.length > 2) {
//       getLatLngByCustomAdress(value);
//     }
//   }
// });

// function getLatLngByCustomAdress(name) {
//   let geocoder = new google.maps.Geocoder();
//   geocoder.geocode({ address: name }, function (results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       let field = document.querySelector("#searchPartner");
//       field.style.borderColor = "#d2d2d8";

//       //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
//       map.setCenter(results[0].geometry.location);

//       map.setZoom(zoom);

//       overrideLocation = {};
//       overrideLocation.lat = results[0].geometry.location.lat();
//       overrideLocation.lng = results[0].geometry.location.lng();

//       handleLocationData(true);
//     } else {
//       // alert('Geocode was not successful for the following reason: ' + status);

//       let field = document.querySelector("#searchPartner");
//       field.style.borderColor = "red";
//       field.value = "Location not found";
//     }
//   });
// }

// function setDistance(sel) {
//   maxDistance = parseInt(sel.value);

//   setZoom(maxDistance);

//   //    console.log(maxDistance);
// }

// function setZoom(dist) {
//   zoom = Math.log2(40000 / (dist / 2)); // magic...
//   // console.log("new zoom", zoom);
//   map.setZoom(zoom);
// }

// function handleCountry(sel) {
//   let numResults = 0;
//   document.querySelectorAll(".partner-item").forEach((element) => {
//     if (sel.value === "all") {
//       element.style.display = "block";
//       numResults += 1;
//     } else {
//       if (sel.value === element.dataset.country) {
//         element.style.display = "block";
//         numResults += 1;
//       } else {
//         element.style.display = "none";
//       }
//     }
//   });
//   let warning = document.querySelector(".no-results");

//   if (numResults === 0) {
//     warning.style.display = "block";
//   } else {
//     warning.style.display = "none";
//   }
// }

// function handleSearch() {
//   let search = document.querySelector("#searchPartner");
//   if (search) {
//     let searchValue = search.value;
//     // console.log(searchValue.length);

//     if (searchValue.length > 2) {
//       getLatLngByCustomAdress(document.querySelector("#searchPartner").value);
//     } else {
//       overrideLocation = null;
//       handleLocationData();
//     }
//   }
// }

// function handleMarkers(hidden) {
//   gmaps_markers.forEach((element) => {
//     // console.log(hidden.indexOf(element.partner_id));
//     if (hidden.indexOf(element.partner_id) >= 0) {
//       element.setVisible(false);
//     } else {
//       element.setVisible(true);
//     }
//   });

//   let newBounds = new google.maps.LatLngBounds();
//   gmaps_markers.forEach((element) => {
//     if (element.getVisible()) {
//       newBounds.extend(element.position);
//     }
//   });
//   // console.log(newBounds);
//   // map.fitBounds(newBounds);
// }
