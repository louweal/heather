export const state = () => ({
  name: "Inbox", // active tab name
});

export const mutations = {
  switch(state, payload) {
    state.name = payload;
  },
};
