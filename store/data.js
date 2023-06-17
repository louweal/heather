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

  SET_USERS(state, payload) {
    state.owners = payload;
  },

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
    state.ads.forEach((a) => (a["distance"] = getDistance(origin, a.location)));
    state.calls.forEach((a) => (a["distance"] = getDistance(origin, a.location)));
  },

  updateOwnerDistance(state, origin) {
    state.owners.forEach((a) => (a["distance"] = getDistance(origin, a.location)));
  },
};

function setOwnerName(owner) {
  return owner ? owner.name : "";
}

function setOwnerLocation(owner) {
  return owner ? owner.location : "";
}

function getDistance(origin, destination) {
  if (origin && destination) {
    try {
      origin = new google.maps.LatLng(origin.lat(), origin.lng());
    } catch (err) {}
    try {
      destination = new google.maps.LatLng(destination.lat(), destination.lng());
    } catch (err) {}

    let distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
    distance = isNaN(distance) ? 0 : distance;

    console.log(distance + " in meter");

    return parseFloat(distance / 1000).toFixed(1);
  }
  console.log("origin :>> ", origin);
  console.log("destination :>> ", destination);
  return -1;
}
