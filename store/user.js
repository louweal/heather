import { contractCallQuery, contractExecuteTransaction } from "../utils/contractService";
import { encodeData, decodeData } from "../utils/encodeHelper";

export const state = () => ({
  signedIn: false,
  accountId: "0.0.3477311",
  userData: undefined, // encoded
  // new user input:
  name: "Jane Doe",
  neighborhood: undefined,
  location: undefined,
  phone: undefined,
  email: undefined,
});

export const mutations = {
  setAccountId(state, payload) {
    state.accountId = payload;
  },

  setLocation(state, payload) {
    state.location = payload;
  },

  setUserData(state, payload) {
    state.name = payload.name ? payload.name : state.name;
    state.neighborhood = payload.neighborhood ? payload.neighborhood : state.neighborhood;
    state.email = payload.email ? payload.email : state.email;
    state.phone = payload.phone ? payload.phone : state.phone;

    // add gmaps location
    let data = { ...payload, location: state.location };
    // encode data
    state.userData = encodeData(data);
  },

  decodeAndSetUserData(state, payload) {
    // set userdata
    state.userData = payload;

    let dd = decodeData(payload);
    state.name = dd.name;
    state.neighborhood = dd.neighborhood;
    state.location = dd.location;
    state.email = dd.email;
    state.phone = dd.phone;

    console.log(state.email);
  },

  signIn(state) {
    state.signedIn = true;
    state.accountId = state.accountId;
  },
  signOut(state) {
    state.signedIn = false;
    // state.accountId = undefined;
  },
};

export const actions = {
  async getUserData({ commit, state }, payload) {
    // try to get userdata from contract
    let params = [{ type: "address", value: payload.accountId }];
    return await contractCallQuery(payload.contractId, "userdata", params, "string");
  },

  async getUserId({ commit, state }, payload) {
    // try to get userdata from contract
    let params = [{ type: "uint256", value: payload.i }];
    return await contractCallQuery(payload.contractId, "users", params, "address");
  },

  async getNumUsers({ commit, state }, payload) {
    // get number of registered users

    // console.log(payload.contractId);
    return 99; // await contractCallQuery(payload.contractId, "numUsers", undefined, "uint32");
  },

  async addUser({ commit, state }, payload) {
    console.log(state.accountId);
    let params = [
      { type: "address", value: state.accountId },
      { type: "string", value: state.userData },
    ];

    return await contractExecuteTransaction(payload.contractId, "addUser", params, false, false);
  },

  async addDummyUser({ commit, dispatch }, payload) {
    let isReg = await dispatch("getUserData", { accountId: payload.accountId, contractId: payload.contractId });

    if (!isReg) {
      let params = [
        { type: "address", value: payload.accountId },
        { type: "string", value: payload.metadata },
      ];
      await delay(1000);
      console.log("blub");
      let res = await contractExecuteTransaction(payload.contractId, "addUser", params, false, false);
      return res;
    } else {
      console.log(`User ${payload.accountId} was already registered`);
    }
  },
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
