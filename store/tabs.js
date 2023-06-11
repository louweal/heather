export const state = () => ({
  name: "Requests", // active tab name
});

export const mutations = {
  switch(state, payload) {
    state.name = payload;
  },
};
