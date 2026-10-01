import crypto from "node:crypto";
export function generateReference() {
  return `CNI-${new Date().getFullYear()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}
