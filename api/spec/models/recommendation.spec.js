const mongoose = require("mongoose");

require("../mongodb_helper");
const Recommendation = require("../../models/recommendation");

describe("Recommendation model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.recommendations.drop(() => {
      done();
    });
  });

  it("has a rating", () => {
    const recommendation = new Recommendation({
      user: "userId",
      visitedDate: new Date(2023, 0, 1),
      rating: 3,
      comment: "examplecomment",
      photos: ["photo1", "photo2"],
    });
    expect(recommendation.rating).toBe(3);
  });

  it("has a comment", () => {
    const recommendation = new Recommendation({
      user: "userId",
      visitedDate: new Date(2023, 0, 1),
      rating: 3,
      comment: "examplecomment",
      photos: ["photo1", "photo2"],
    });
    expect(recommendation.comment).toBe("examplecomment");
  });

  it("has an array of photos", () => {
    const recommendation = new Recommendation({
      user: "userId",
      visitedDate: new Date(2023, 0, 1),
      rating: 3,
      comment: "examplecomment",
      photos: ["photo1", "photo2"],
    });
    expect(recommendation.photos).toEqual(["photo1", "photo2"]);
  });
});
