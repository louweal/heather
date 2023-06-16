export function encodeData(data) {
  return Buffer.from(JSON.stringify(data)).toString("base64");
}

export function decodeData(str) {
  if (str) {
    if (typeof str === "string") {
      if (str.startsWith("StatusError")) {
        console.log("StatusError");
        return str;
      }
      let decoded = Buffer.from(str, "base64").toString();
      return JSON.parse(decoded);
    } else {
      return str;
    }
  }
}
