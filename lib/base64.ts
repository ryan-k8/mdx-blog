export const toBase64 = (value: string) => {
  return Buffer.from(value, "binary").toString("base64");
};

export const toStringFromBase64 = (value: string) => {
  return Buffer.from(value, "base64").toString("binary");
};
