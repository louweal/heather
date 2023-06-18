import { encodeData, decodeData } from "~/utils/encodeHelper";
import { contractCallQuery, contractExecuteTransaction } from "~/utils/hederaService";

let factoryContractId = process.env.BORROW_CONTRACT;

// borrowFactory functions

export async function deployBorrow(owner, details, startdate, enddate, deposit, totalRent) {
  // works
  let params = [
    { type: "address", value: owner },
    { type: "string", value: encodeData(details) },
    { type: "uint32", value: startdate },
    { type: "uint32", value: enddate },
    { type: "uint32", value: deposit * 1e8 },
    { type: "uint32", value: totalRent * 1e8 },
  ];

  return await contractExecuteTransaction(factoryContractId, "deployBorrow", params);
}

export async function getBorrowContract(borrowerId) {
  console.log(borrowerId);
  let params = [{ type: "address", value: borrowerId }];
  return await contractCallQuery(factoryContractId, "borrowContract", params, "address");
}

// borrow contract functions

export async function getRequestDetails(contractId) {
  let encodedDetails = await contractCallQuery(contractId, "details", undefined, "string");
  return decodeData(encodedDetails);
}

export async function getProblem(contractId) {
  return await contractCallQuery(contractId, "problem", undefined, "string");
}

export async function getState(contractId) {
  return await contractCallQuery(contractId, "getState", undefined, "string");
}
export async function getOwnerReview(contractId) {
  return await contractCallQuery(contractId, "ownerReview", undefined, "string");
}

export async function getBorrowerReview(contractId) {
  return await contractCallQuery(contractId, "borrowerReview", undefined, "string");
}

export async function getOwner(contractId) {
  return await contractCallQuery(contractId, "owner", undefined, "uint32");
}

export async function getBorrower(contractId) {
  return await contractCallQuery(contractId, "borrower", undefined, "uint32");
}

export async function getTotalRent(contractId) {
  return await contractCallQuery(contractId, "totalRent", undefined, "uint32");
}

export async function acceptRequest(contractId) {
  return await contractExecuteTransaction(contractId, "acceptRequest");
}

export async function startBorrow(contractId, value) {
  return await contractExecuteTransaction(contractId, "startBorrow", undefined, undefined, value * 1e8);
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
  return await contractExecuteTransaction(contractId, "confirmReturn");
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

//helper functions

export function computeTotalRent(rent, startdate, enddate) {
  let numDays = (enddate - startdate) / 86400;
  return rent.start + (numDays - 1) * rent.extra;
}
