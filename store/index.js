export const state = () => ({
  origin: { lat: 0.1589443082694, lng: 0.492449882264405 },
  foundHashpack: false,
});

export const mutations = {
  foundHashpack(state, payload) {
    state.foundHashpack = payload.name === "HashPack";
  },
};
