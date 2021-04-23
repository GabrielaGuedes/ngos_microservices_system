/* eslint-disable no-undef */
const chai = require("chai");
const FormatDonatedValue = require("../../utils/format-donated-value");

const { expect } = chai;

describe("FormatDonatedValue", () => {
  describe("When the number is a float with a lot of decimals", () => {
    it("converts the float to string and removes the dot", (done) => {
      const value = 14.26426;
      expect(FormatDonatedValue(value)).to.eq("1426");
      done();
    });
  });

  describe("When the number is a float with 1 decimal", () => {
    it("converts the float to string and removes the dot", (done) => {
      const value = 14.0;
      expect(FormatDonatedValue(value)).to.eq("1400");
      done();
    });
  });

  describe("When the number is a float with 1 decimal different from 0", () => {
    it("converts the float to string and removes the dot", (done) => {
      const value = 14.2;
      expect(FormatDonatedValue(value)).to.eq("1420");
      done();
    });
  });

  describe("When the number is a float with 2 decimals", () => {
    it("converts the float to string and removes the dot", (done) => {
      const value = 14.25;
      expect(FormatDonatedValue(value)).to.eq("1425");
      done();
    });
  });
});
