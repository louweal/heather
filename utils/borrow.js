import { encodeData, decodeData } from "~/utils/encodeHelper";
import { contractCallQuery, contractExecuteTransaction } from "~/utils/hederaService";

let factoryContractId = process.env.BORROW_CONTRACT;
// let accountId = process.env.MY_ACCOUNT_ID;

export async function deployBorrow(owner, details, startdate, enddate, deposit, totalRent) {
  let params = [
    { type: "address", value: owner },
    { type: "string", value: encodeData(details) },
    { type: "uint32", value: startdate },
    { type: "uint32", value: enddate },
    { type: "uint32", value: deposit },
    { type: "uint32", value: totalRent },
  ];

  return await contractExecuteTransaction(factoryContractId, "deployBorrow", params, "address");
}

export async function getRequestDetails(contractId) {
  let encodedDetails = await contractCallQuery(contractId, "details", undefined, "string");
  return decodeData(encodedDetails);
}

export async function getState(contractId) {
  return await contractCallQuery(contractId, "getState", undefined, "string");
}

export async function acceptRequest(contractId) {
  return await contractExecuteTransaction(contractId, "acceptRequest");
}

export async function startBorrow(contractId, value) {
  return await contractExecuteTransaction(contractId, "startBorrow", params, undefined, value);
}

export async function requestExtend(contractId, extraDays) {
  let params = [{ type: "uint8", value: extraDays }];
  return await contractExecuteTransaction(contractId, "requestExtend", params);
}

export async function acceptExtend(contractId) {
  return await contractExecuteTransaction(contractId, "acceptExtend");
}

export async function returnBorrow(contractId, returndate) {
  let params = [{ type: "uint32", value: returndate }];
  return await contractExecuteTransaction(contractId, "returnBorrow", params);
}

export async function confirmReturn(contractId) {
  return await contractExecuteTransaction(contractId, "returnBorrow");
}

export async function reportMissing(contractId) {
  return await contractExecuteTransaction(contractId, "reportMissing");
}

export async function acceptReturn(contractId) {
  return await contractExecuteTransaction(contractId, "acceptReturn");
}

export async function reportProblem(contractId, problem) {
  let params = [{ type: "string", value: problem }];
  return await contractExecuteTransaction(contractId, "reportProblem", params);
}

export async function writeOwnerReview(contractId, review) {
  let params = [{ type: "string", value: review }];
  return await contractExecuteTransaction(contractId, "writeOwnerReview", params);
}

export async function writeBorrowerReview(contractId, review) {
  let params = [{ type: "string", value: review }];
  return await contractExecuteTransaction(contractId, "writeBorrowerReview", params);
}

export async function settleDeposit(contractId, value) {
  return await contractExecuteTransaction(contractId, "settleDeposit", undefined, undefined, value);
}
