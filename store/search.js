export const state = () => ({
  query: undefined,
  place: undefined,
  placeValue: undefined, // place as displayed in input (value)
  maxDistance: 5,
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
  setMaxDistance(state, payload) {
    state.maxDistance = payload;
    console.log("store dist changeed");
  },
};
