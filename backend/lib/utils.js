const crypto = require("crypto");

function rowArrayToHash(row, meta) {
  const hash = {};
  row.forEach((e, idx) => {
    const key = meta[idx].name.toLowerCase();
    hash[key] = e;
  });
  return hash;
}

function hashRows(oracleResult) {
  const prettyRows = [];
  const meta = oracleResult.metaData;
  const rows = oracleResult.rows;
  rows.forEach((e) => {
    prettyRows.push(rowArrayToHash(e, meta));
  });
  return prettyRows;
}

function md5Hash(string, sekret) {
  if (!string) return null;
  const md5Hasher = crypto.createHmac("md5", sekret);
  return md5Hasher.update(string).digest("hex");
}

exports.hashRows = hashRows;
exports.md5Hash = md5Hash;
