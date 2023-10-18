const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has a username", () => {
    const user = new User({
      username: "username",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.username).toEqual("username");
  });

  it("has an email address", () => {
    const user = new User({
      username: "username",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      username: "username",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", () => {
    return User.find().then((users) => {
      expect(users).toEqual([]);
    });
  });

  it("can save a user", () => {
    const user = new User({
      username: "username",
      email: "someone@example.com",
      password: "password",
    });

    return user.save().then(() => {
      return User.find().then((users) => {
        // expect(err).toBeNull();
        expect(users[0]).toMatchObject({
          username: "username",
          email: "someone@example.com",
          password: "password",
        });;
      });
    });
  });
});
