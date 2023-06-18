import { encodeData } from "../utils/encodeHelper";

export const state = () => ({
  signedIn: false,
  id: "0.0.000000",
  userData: undefined, // encoded
  // new user input:
  name: "Jane Doe",
  neighborhood: undefined,
  location: { lat: 52.1589443082694, lng: 4.492449882264405 },
  phone: undefined,
  email: undefined,
});

export const mutations = {
  // setAccountId(state, payload) {
  //   state.id = payload;
  // },

  setLocation(state, payload) {
    state.location = payload;
  },

  setUserData(state, payload) {
    console.log(payload);

    state.id = payload.id;
    state.name = payload.name;
    state.neighborhood = payload.neighborhood;
    state.email = payload.email;
    state.phone = payload.phone;
    state.location = payload.location;

    // encode data
    state.userData = encodeData(payload);
  },

  signIn(state) {
    state.signedIn = true;
    state.id = state.id;
  },
  signOut(state) {
    state.signedIn = false;
    // state.id = undefined;
  },
};
