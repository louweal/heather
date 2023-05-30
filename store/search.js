export const state = () => ({
  query: undefined,
  place: undefined,
  placeValue: undefined, // place as displayed in input (value)
});

export const mutations = {
  setQuery(state, payload) {
    state.query = payload;
  },
  setPlace(state, payload) {
    state.place = payload;
  },
  setPlaceValue(state, payload) {
    state.placeValue = payload;
  },
};
