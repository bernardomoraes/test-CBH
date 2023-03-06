const {
  deterministicPartitionKey,
  TRIVIAL_PARTITION_KEY,
  MAX_PARTITION_KEY_LENGTH,
} = require("./dpk");

const crypto = require("crypto");

const isHexEncoded = (str) => {
  const regex = /^[0-9a-fA-F]+$/;
  return regex.test(str);
};
let eventMock = {
  partitionKey: "1",
};

describe("deterministicPartitionKey", () => {
  describe("when given an input with no partitionKey", () => {
    it(`should return the literal '${TRIVIAL_PARTITION_KEY}' when given no input`, () => {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
      expect(typeof trivialKey).toBe("string");
    });

    it("should return encoded PK when given empty object as input", () => {
      const trivialKey = deterministicPartitionKey({});
      expect(typeof trivialKey).toBe("string");
      expect(trivialKey.length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
      expect(isHexEncoded(trivialKey)).toBe(true);
    });
  });

  describe("when given an input with partitionKey", () => {
    it(`should return the exactly same PK when it length is less than ${MAX_PARTITION_KEY_LENGTH}`, () => {
      const partitionKey = deterministicPartitionKey(eventMock);

      expect(partitionKey).toBe(eventMock.partitionKey);
      expect(typeof partitionKey).toBe("string");
      expect(partitionKey.length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
      expect(isHexEncoded(partitionKey)).toBe(true);
    });

    it(`should return another Hex encoded PK when it length is bigger than ${MAX_PARTITION_KEY_LENGTH}`, () => {
      const mockWithLongPartitionKey = {
        ...eventMock,
        partitionKey: "0".repeat(MAX_PARTITION_KEY_LENGTH + 1),
      };

      const partitionKey = deterministicPartitionKey(mockWithLongPartitionKey);
      expect(partitionKey).toBe(
        crypto
          .createHash("sha3-512")
          .update(mockWithLongPartitionKey.partitionKey)
          .digest("hex")
      );
      expect(typeof partitionKey).toBe("string");
      expect(partitionKey.length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
      expect(isHexEncoded(partitionKey)).toBe(true);
    });

    it("should return a stringified PK when it is not a string", () => {
      const mockWithNonStringPartitionKey = {
        ...eventMock,
        partitionKey: 1,
      };

      const partitionKey = deterministicPartitionKey(
        mockWithNonStringPartitionKey
      );
      expect(partitionKey).toBe(
        JSON.stringify(mockWithNonStringPartitionKey.partitionKey)
      );
      expect(typeof partitionKey).toBe("string");
      expect(partitionKey.length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
      expect(isHexEncoded(partitionKey)).toBe(true);
    });

    it(`should return a encoded PK when it is not a string and bigger than ${MAX_PARTITION_KEY_LENGTH}`, () => {
      const mockWithNonStringPartitionKey = {
        ...eventMock,
        partitionKey: {
          a: "0".repeat(MAX_PARTITION_KEY_LENGTH + 1),
        },
      };

      const partitionKey = deterministicPartitionKey(
        mockWithNonStringPartitionKey
      );
      expect(partitionKey).toBe(
        crypto
          .createHash("sha3-512")
          .update(JSON.stringify(mockWithNonStringPartitionKey.partitionKey))
          .digest("hex")
      );
      expect(typeof partitionKey).toBe("string");
      expect(partitionKey.length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
      expect(isHexEncoded(partitionKey)).toBe(true);
    });
  });
});
