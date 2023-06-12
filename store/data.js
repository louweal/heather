import { encodeData, decodeData } from "../utils/encodeHelper";
import { contractCallQuery, contractExecuteTransaction } from "../utils/contractService";

export const state = () => ({
  ads: [],
  calls: [],
  owners: [],
  both: [], // combines ads and calls, sorted by date
  waiting: false,
});

let adFactoryId = "0.0.14170753";
let userLookupId = "0.0.14143945";

export const mutations = {
  SET_ADS(state, payload) {
    state.ads = payload;
    state.ads.forEach((a) => (a["location"] = setOwnerLocation(state.owners.find((o) => o.id === a.owner))));
    state.ads.forEach((a) => (a["name"] = setOwnerName(state.owners.find((o) => o.id === a.owner))));
    state.ads.sort((a, b) => (a.available > b.available ? -1 : 1));

    // set users also in localstorage
    localStorage.setItem("ads", JSON.stringify(state.ads));
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

    // set users also in localstorage
    localStorage.setItem("owners", JSON.stringify(state.owners));
  },

  SET_BOTH(state) {
    state.both = state.ads.concat(state.calls);
    state.both.sort((a, b) => (a.date > b.date ? -1 : 1));

    // remove users that don't have any ads or calls
    state.owners.forEach((o) => (o["numItems"] = setNumItems(state.ads.filter((a) => o.id === a.owner))));
    state.owners = state.owners.filter((o) => o["numItems"] > 0);
  },

  updateDistance(state, searchLocation) {
    state.ads.forEach((a) => (a["distance"] = getDistance(a.location, searchLocation)));
    state.calls.forEach((a) => (a["distance"] = getDistance(a.location, searchLocation)));
    state.both = state.ads.concat(state.calls);

    // state.owners.forEach((a) => (a["distance"] = getDistance(a.location, searchLocation)));
  },

  updateOwnerDistance(state, searchLocation) {
    state.owners.forEach((a) => (a["distance"] = getDistance(a.location, searchLocation)));
  },
};

export const actions = {
  // async SET_USERS({ commit, dispatch }, payload) {},

  async createDummyAdContract({ commit, state }, payload) {
    console.log("in createAdContract");

    let params = [
      { type: "string", value: encodeData(payload.metadata) },
      { type: "uint32", value: payload.deposit * 1e8 },
      { type: "uint32", value: payload.rent * 1e8 },
      { type: "address", value: payload.dummyOwner },
    ];

    let newContractId = await contractExecuteTransaction(payload.factoryContractId, "deployDummyAd", params, "address", false);
    console.log(newContractId);

    // return;

    let params2 = [
      {
        type: "address",
        value: payload.dummyOwner, // dummy owner of the contract
      },
      {
        type: "address",
        value: newContractId,
      },
    ];

    let status = await contractExecuteTransaction(payload.lookupContractId, "addAd", params2, false, false);

    console.log(status);

    // add to store?

    return newContractId;
  },

  async createBorrowContract(state, payload) {
    state.waiting = true;

    // deploy

    state.waiting = false;
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

function getDistance(location, searchLocation) {
  let lat = location.lat;
  let lng = location.lng;
  let destination = new google.maps.LatLng(lat, lng);

  let distance = google.maps.geometry.spherical.computeDistanceBetween(searchLocation, destination);
  let distanceInKm = parseFloat(distance / 1000).toFixed(1);

  return distanceInKm;
}
