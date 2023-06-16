export const state = () => ({
  name: "Your items", // active tab name
});

export const mutations = {
  switch(state, payload) {
    state.name = payload;
  },
};
