export const state = () => ({
  signedIn: false,
  id: "0.0.000000",
  name: "Jane Doe",
  neighborhood: undefined,
  location: { lat: 52.1589443082694, lng: 4.492449882264405 },
  phone: undefined,
  email: undefined,
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

  signIn(state) {
    state.signedIn = true;
    state.id = state.id;
  },
  signOut(state) {
    state.signedIn = false;
  },
};
