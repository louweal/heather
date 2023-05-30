export const state = () => ({
  ads: [],
  calls: [],
  owners: [],
});

export const mutations = {
  SET_ADS(state, payload) {
    state.ads = payload;
    state.ads.forEach((a) => (a["location"] = state.owners.find((o) => o.id === a.owner).location));
    state.ads.forEach((a) => (a["name"] = state.owners.find((o) => o.id === a.owner).name));
    state.ads.sort((a, b) => (a.available > b.available ? -1 : 1));
  },
  SET_CALLS(state, payload) {
    state.calls = payload;
  },
  SET_OWNERS(state, payload) {
    state.owners = payload;
  },

  updateDistance(state, searchLocation) {
    state.ads.forEach((a) => (a["distance"] = getDistance(a.location, searchLocation)));
  },
};

export const actions = {};

function getDistance(location, searchLocation) {
  let lat = location.lat;
  let lng = location.lng;
  let destination = new google.maps.LatLng(lat, lng);

  let distance = google.maps.geometry.spherical.computeDistanceBetween(searchLocation, destination);
  let distanceInKm = parseFloat(distance / 1000).toFixed(1);

  return distanceInKm;
}
