export function encodeData(data) {
  return Buffer.from(JSON.stringify(data)).toString("base64");
}

export function decodeData(str) {
  let decoded = Buffer.from(str, "base64").toString();
  // console.log("decoded :>> ", decoded);
  return JSON.parse(decoded);
}
