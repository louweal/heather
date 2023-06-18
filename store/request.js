export const state = () => ({
  id: undefined,
  message: undefined,
  startdate: undefined,
  enddate: undefined,
  borrower: undefined,
  state: "Created",
  progress: 0,
});

export const mutations = {
  setRequest(state, payload) {
    state.id = payload.id;
    state.message = payload.message;
    state.startdate = payload.from;
    state.enddate = payload.to;
    state.borrower = payload.borrower;
  },

  setState(state, payload) {
    state.state = payload;
  },

  updateProgress(state) {
    state.progress += 1;
  },
};
