const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

const mockData = [
  {
    name: 'First Example',
    partitionKey: 'e2c2e38ed60a747f038cfb03a07368181e794851f887fe6f0b5dcc4a0241b05db70cdf1e849e0b330a63f2d387ee1bc5b294e3e3a810ef2fd1b731b1d1c79f71'
  },
  {
    name: 'Second Example',
    partitionKey: 'e2c2e38ed60a747f038cfb03a07368181e794851f887fe6f0b5dcc4a0241b05db70cdf1e849e0b330a63f2d387ee1bc5b294e3e3a810ef2fd1b731b1d1c79f71e2c2e38ed60a747f038cfb03a07368181e794851f887fe6f0b5dcc4a0241b05db70cdf1e849e0b330a63f2d387ee1bc5b294e3e3a810ef2fd1b731b1d1c79f71312'
  },
  {
    name: 'Third Example',
    partitionKey: undefined
  }
]

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Partition key length shouldn't be higher than 256", () => {
    const trivialKey = deterministicPartitionKey(mockData[0])
    const isLengthLessThanMax = trivialKey.length < 256
    expect(isLengthLessThanMax).toBe(true)
  });
  
  it("Returns new hash because the length of the key is higher than 256", () => {
    const trivialKey = deterministicPartitionKey(mockData[1])
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(mockData[1].partitionKey).digest("hex"))
  });
  
  it("Returns a new hash because there is no partition key in the event", () => {
    const trivialKey = deterministicPartitionKey(mockData[2])
    const data = JSON.stringify(mockData[2])
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(data).digest("hex"))
  });
});
