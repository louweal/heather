export const state = () => ({
  awaiting: false,
});

export const mutations = {};

export const actions = {
  async createContract(state, payload) {
    state.awaiting = true;
    await delay(5000);
    state.awaiting = false;
  },
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
