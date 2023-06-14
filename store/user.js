import { encodeData, decodeData } from "../utils/encodeHelper";

export const state = () => ({
  signedIn: false,
  accountId: "0.0.3477311",
  userData: undefined, // encoded
  // new user input:
  name: "Jane Doe",
  neighborhood: undefined,
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
    state.neighborhood = payload.neighborhood ? payload.neighborhood : state.neighborhood;
    state.email = payload.email ? payload.email : state.email;
    state.phone = payload.phone ? payload.phone : state.phone;

    // add gmaps location
    let data = { ...payload, location: state.location };
    // encode data
    state.userData = encodeData(data);
  },

  // decodeAndSetUserData(state, payload) {
  //   // set userdata
  //   state.userData = payload;

  //   let dd = decodeData(payload);
  //   state.name = dd.name;
  //   state.neighborhood = dd.neighborhood;
  //   state.location = dd.location;
  //   state.email = dd.email;
  //   state.phone = dd.phone;
  // },

  signIn(state) {
    state.signedIn = true;
    state.accountId = state.accountId;
  },
  signOut(state) {
    state.signedIn = false;
    // state.accountId = undefined;
  },
};
