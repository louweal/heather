import { updateSignMethod } from "~/utils/hederaService";

export const state = () => ({
  signedIn: false,
  id: "0.0.000000",
  name: "Jane Doe",
  neighborhood: undefined,
  location: { lat: 52.1589443082694, lng: 4.492449882264405 },
  phone: undefined,
  email: undefined,
  method: "client", // sign method "client" or "signer"
});

export const mutations = {
  setUserData(state, payload) {
    state.id = payload.id;
    state.name = payload.name;
    state.neighborhood = payload.neighborhood;
    state.email = payload.email;
    state.phone = payload.phone;
    state.location = payload.location;
  },

  setId(id) {
    state.id = id; //hashconnect pair succesful
  },

  setMethod(state, payload) {
    state.method = payload.method;
    updateSignMethod(state.method);
  },

  signIn(state) {
    state.signedIn = true;
  },
  signOut(state) {
    state.signedIn = false;
  },
};
