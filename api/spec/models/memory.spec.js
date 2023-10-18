const mongoose = require("mongoose");

require("../mongodb_helper");
const Memory = require("../../models/memory");

describe("Memory model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.memories.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    const memory = new Memory({
      user: "userId",
      message: "examplemessage",
      photos: ["photo1", "photo2"],
    });
    expect(memory.message).toBe("examplemessage");
  });

  it("has an array of photos", () => {
    const memory = new Memory({
      user: "userId",
      message: "examplemessage",
      photos: ["photo1", "photo2"],
    });
    expect(memory.photos).toEqual(["photo1", "photo2"]);
  });
});
