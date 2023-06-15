export const state = () => ({
  ads: [],
  calls: [],
  owners: [],
});

export const mutations = {
  SET_ADS(state, payload) {
    state.ads = payload;
    state.ads.forEach((a) => (a["location"] = setOwnerLocation(state.owners.find((o) => o.id === a.owner))));
    state.ads.forEach((a) => (a["name"] = setOwnerName(state.owners.find((o) => o.id === a.owner))));
  },
  SET_CALLS(state, payload) {
    state.calls = payload;
    state.calls.forEach((a) => (a["location"] = setOwnerLocation(state.owners.find((o) => o.id === a.owner))));
    state.calls.forEach((a) => (a["name"] = setOwnerName(state.owners.find((o) => o.id === a.owner))));
  },
  // SET_OWNERS(state, payload) {
  //   state.owners = payload;
  //   state.owners.forEach((a) => (a["location"] = { lat: a.lat, lng: a.lng }));
  //   delete state.owners.lat;
  //   delete state.owners.lng;
  // },

  SET_USERS(state, payload) {
    state.owners = payload;
  },

  // SET_BOTH(state) {
  //   state.both = state.ads.concat(state.calls);
  //   state.both.sort((a, b) => (a.date > b.date ? -1 : 1));

  //   // remove users that don't have any ads or calls
  //   state.owners.forEach((o) => (o["numItems"] = setNumItems(state.ads.filter((a) => o.id === a.owner))));
  //   state.owners = state.owners.filter((o) => o["numItems"] > 0);
  // },

  addAd(state, ad) {
    let newAd = {
      ...ad,
      name: setOwnerName(state.owners.find((o) => o.id === ad.owner)),
      location: setOwnerLocation(state.owners.find((o) => o.id === ad.owner)),
    };
    state.ads.push(newAd);
  },

  updateAd(state, ad) {},

  removeAd(state, id) {
    state.ads = state.ads.filter((a) => a.id !== id);
  },

  addCall(state, call) {
    let newCall = {
      ...call,
      name: setOwnerName(state.owners.find((o) => o.id === call.owner)),
      location: setOwnerLocation(state.owners.find((o) => o.id === call.owner)),
    };
    state.calls.push(newCall);
  },

  updateCall(state, call) {},

  removeCall(state, id) {
    state.calls = state.calls.filter((a) => a.id !== id);
  },

  updateDistance(state, origin) {
    console.log("updat distance");
    state.ads.forEach((a) => (a["distance"] = getDistance(origin, a.location)));
    state.calls.forEach((a) => (a["distance"] = getDistance(origin, a.location)));
  },

  updateOwnerDistance(state, origin) {
    state.owners.forEach((a) => (a["distance"] = getDistance(origin, a.location)));
  },

  setUserDistance(state, origin) {
    state.owners.forEach((a) => (a["distance"] = getDistance(origin, a.location)));
  },
};

function setNumItems(items) {
  return items ? items.length : 0;
}

function setOwnerName(owner) {
  return owner ? owner.name : "";
}

function setOwnerLocation(owner) {
  return owner ? owner.location : "";
}

function getDistance(origin, destination) {
  try {
    origin = new google.maps.LatLng(origin.lat(), origin.lng());
  } catch (err) {}
  try {
    destination = new google.maps.LatLng(destination.lat(), destination.lng());
  } catch (err) {}

  console.log(origin);
  console.log("destination :>> ", destination);
  let distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
  distance = isNaN(distance) ? 0 : distance;

  let distanceInKm = parseFloat(distance / 1000).toFixed(1);
  return distanceInKm;
}
