interface BigInt {
  toJSON(): string;
}

(BigInt.prototype as unknown as BigInt)["toJSON"] = function () {
  return this.toString();
};
