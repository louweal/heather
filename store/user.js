import { contractCallQuery, contractExecuteTransaction } from "../utils/contractService";

export const state = () => ({
  signedIn: false,
  accountId: "0.0.3477311",
  userData: undefined, // encoded
  // new user input:
  name: "Jane Doe",
  placeName: undefined,
  location: undefined,
  phone: undefined,
  email: undefined,
});

export const mutations = {
  setAccountId(state, payload) {
    state.accountId = payload;
  },

  setLocation(state, payload) {
    state.location = payload;
  },

  setUserData(state, payload) {
    state.name = payload.name ? payload.name : state.name;
    state.placeName = payload.placeName ? payload.placeName : state.placeName;
    state.email = payload.email ? payload.email : state.email;
    state.phone = payload.phone ? payload.phone : state.phone;

    // add gmaps location
    let data = { ...payload, location: state.location };
    // encode data
    state.userData = encodeData(data);
  },

  decodeAndSetUserData(state, payload) {
    // set userdata
    state.userData = payload;

    let dd = decodeData(payload);
    state.name = dd.name;
    state.placeName = dd.placeName;
    state.location = dd.location;
    state.email = dd.email;
    state.phone = dd.phone;

    console.log(state.email);
  },

  signIn(state) {
    state.signedIn = true;
    state.accountId = state.accountId;
  },
  signOut(state) {
    state.signedIn = false;
    // state.accountId = undefined;
  },
};

export const actions = {
  async isRegistered({ commit, state }, payload) {
    // try to get userdata from contract
    let params = [{ type: "address", value: payload.accountId }];
    return await contractCallQuery(payload.contractId, "userdata", params, "string");
  },

  async addUser({ commit, state }, payload) {
    console.log(state.accountId);
    let params = [
      { type: "address", value: state.accountId },
      { type: "string", value: state.userData },
    ];

    return await contractExecuteTransaction(payload.contractId, "addUser", params, false, false);
  },
};

// helper functions

function encodeData(data) {
  return Buffer.from(JSON.stringify(data)).toString("base64");
}

function decodeData(str) {
  let decoded = Buffer.from(str, "base64").toString();
  // console.log("decoded :>> ", decoded);
  return JSON.parse(decoded);
}
