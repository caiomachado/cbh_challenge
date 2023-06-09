const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const trivialKey = "0";
  const maxKeyLength = 256;
 
  if (event) {    
    if (!event.partitionKey) {
      const data = JSON.stringify(event);
      return crypto.createHash("sha3-512").update(data).digest("hex");
    }

    return event.partitionKey.length > maxKeyLength ? 
      crypto.createHash("sha3-512").update(event.partitionKey).digest("hex") : event.partitionKey;
  } 

  return trivialKey;
};