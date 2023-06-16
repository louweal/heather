import { encodeData, decodeData } from "~/utils/encodeHelper";
import { contractCallQuery, contractExecuteTransaction } from "~/utils/hederaService";

let contractId = process.env.STORAGE_CONTRACT;
let accountId = process.env.MY_ACCOUNT_ID;

// create ad
export async function addAd(userId, data) {
  let params = [
    { type: "address", value: userId },
    { type: "string", value: encodeData(data) },
  ];

  return await contractExecuteTransaction(contractId, "addAd", params);
}

// retrieve ad

export async function getAd(userId, i) {
  // try to get userdata from contract
  let params = [
    { type: "address", value: userId },
    { type: "uint32", value: i },
  ];
  let ad = await contractCallQuery(contractId, "getAd", params, "string");

  return decodeData(ad);
}

// update ad
export async function updateAd(userId, i, data) {
  let params = [
    { type: "address", value: userId },
    { type: "uint32", value: i },
    { type: "string", value: encodeData(data) },
  ];

  return await contractExecuteTransaction(contractId, "updateAd", params);
}

// remove ad
export async function removeAd(userId, i) {
  let params = [
    { type: "address", value: userId },
    { type: "uint32", value: i },
  ];

  return await contractExecuteTransaction(contractId, "removeAd", params);
}
