const { createToken } = require("./tokens"); // Replace with actual path
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

describe("createToken", () => {
  it("should create a valid JWT token with the correct payload", () => {
    const user = { username: "testuser", isAdmin: true };
    const token = createToken(user);

    const decoded = jwt.verify(token, SECRET_KEY);
    expect(decoded).toEqual({
      username: "testuser",
      isAdmin: true,
      iat: expect.any(Number),
    });
  });

  it("should default isAdmin to false if not provided", () => {
    const user = { username: "testuser" };
    const token = createToken(user);

    const decoded = jwt.verify(token, SECRET_KEY);
    expect(decoded).toEqual({
      username: "testuser",
      isAdmin: false,
      iat: expect.any(Number),
    });
  });
});