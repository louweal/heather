export const state = () => ({
  query: undefined,
});

export const mutations = {
  setQuery(state, payload) {
    state.query = payload;
  },
};
