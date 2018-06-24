const expect = require("chai").expect;
const axios = require("axios");

describe("GET endpoints", () => {
  it("/token should return an object with status 200", done => {
    axios("http://localhost:3030/token").then(response => {
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an("object");
      done();
    });
  });
});
