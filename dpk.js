const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.TRIVIAL_PARTITION_KEY = TRIVIAL_PARTITION_KEY;
exports.MAX_PARTITION_KEY_LENGTH = MAX_PARTITION_KEY_LENGTH;

const standardEncoding = (data) => {
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }

  return crypto.createHash("sha3-512").update(data).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let candidatePK = event.partitionKey;

  if (!candidatePK) {
    candidatePK = standardEncoding(event);
  }

  if (typeof candidatePK !== "string") {
    candidatePK = JSON.stringify(candidatePK);
  }

  if (candidatePK.length > MAX_PARTITION_KEY_LENGTH) {
    candidatePK = standardEncoding(candidatePK);
  }

  return candidatePK;
};
