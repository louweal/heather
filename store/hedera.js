export const state = () => ({
  awaiting: false,
});

export const mutations = {};

export const actions = {
  // borrow contract

  async createBorrowContract(state, payload) {
    state.awaiting = true;

    // deploy
    await delay(5000);
    state.awaiting = false;
  },

  async sendBorrowRequest() {
    state.awaiting = true;

    state.awaiting = false;
  },

  async acceptBorrowRequest() {},

  async returnBorrow() {
    // get
  },

  async confirmReturn() {
    // returns deposit to borrower
  },

  async declineReturn() {
    // claims deposit to lender
  },

  // rent contract
  async createRentContract() {},

  async sendRentRequest() {},

  async acceptRentRequest() {},
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
