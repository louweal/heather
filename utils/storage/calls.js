import { encodeData, decodeData } from "~/utils/encodeHelper";
import { contractCallQuery, contractExecuteTransaction } from "~/utils/hederaService";

let contractId = process.env.STORAGE_CONTRACT;
let accountId = process.env.MY_ACCOUNT_ID;

// create call
export async function addCall(userId, data) {
  let params = [
    { type: "address", value: userId },
    { type: "string", value: encodeData(data) },
  ];

  return await contractExecuteTransaction(contractId, "addCall", params, false, false);
}

// retrieve call

export async function getCall(userId, i) {
  // try to get userdata from contract
  let params = [
    { type: "address", value: userId },
    { type: "uint32", value: i },
  ];
  let call = await contractCallQuery(contractId, "getCall", params, "string");

  if (call) {
    return decodeData(call);
  }
  return undefined;
}

// update call
export async function updateCall(userId, i, data) {
  let params = [
    { type: "address", value: userId },
    { type: "uint32", value: i },
    { type: "string", value: encodeData(data) },
  ];

  return await contractExecuteTransaction(contractId, "updateCall", params, false, false);
}

// remove call
export async function removeCall(userId, i) {
  let params = [
    { type: "address", value: userId },
    { type: "uint32", value: i },
  ];

  return await contractExecuteTransaction(contractId, "removeCall", params, false, false);
}
