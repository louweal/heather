import { contractCallQuery, contractExecuteTransaction } from "../hederaService";
import { encodeData, decodeData } from "../encodeHelper";

let contractId = process.env.STORAGE_CONTRACT;
let accountId = process.env.MY_ACCOUNT_ID;

// create user
export async function addUser(data) {
  data = { ...data, id: accountId };

  let params = [
    { type: "address", value: accountId },
    { type: "string", value: encodeData(data) },
  ];
  return await contractExecuteTransaction(contractId, "addUser", params, false, false);
}

// get user

export async function getUserId(i) {
  // try to get userdata from contract
  let params = [{ type: "uint256", value: i }];
  return await contractCallQuery(contractId, "users", params, "address");
}

export async function getUserData(userId) {
  // try to get userdata from contract
  let params = [{ type: "address", value: userId }];
  let metadata = await contractCallQuery(contractId, "userdata", params, "string");

  if (metadata) {
    return decodeData(metadata);
  }
  return undefined;
}

// update user
export async function updateUser(data) {
  data = { ...data, id: accountId };

  let params = [
    { type: "address", value: accountId },
    { type: "string", value: encodeData(data) },
  ];

  return await contractExecuteTransaction(contractId, "updateUser", params, false, false);
}

// delete user
export async function removeUser() {
  // todo: check user exists before remove ?

  let params = [{ type: "address", value: accountId }];
  let res = await contractExecuteTransaction(contractId, "removeUser", params, false, false);
  return res;
}
