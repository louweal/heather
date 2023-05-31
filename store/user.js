export const state = () => ({
  signedIn: false,
  accountId: "0.0.3477311",
  name: undefined,
  placeName: undefined,
  location: undefined,
});

export const mutations = {
  setAccountId(state, payload) {
    state.accountId = payload;
  },
  setName(state, payload) {
    state.name = payload;
  },
  setPlaceName(state, payload) {
    state.placeName = payload;
  },
  setLocation(state, payload) {
    state.location = payload;
  },
};
