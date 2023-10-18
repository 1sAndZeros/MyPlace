const mongoose = require("mongoose");

require("../mongodb_helper");
const City = require("../../models/city");

describe("City model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.cities.drop(() => {
      done();
    });
  });

  it("has a name", () => {
    const city = new City({
      name: "cityname",
      recommendations: ["rec1, rec2, rec3"],
      memories: ["memory1, memory2, memory3"],
      visited: true,
      visitedDate: 17-10-2023,
      rating: 4
    });
    expect(city.name).toEqual("cityname");
  });

//   it("has an array of recommendations", () => {
//     // const recommendation = new Recommendation({ name: 'rec1' });
//     // recommendation.save();
//     const city = new City({
//         name: "cityname",
//         recommendations: [recommendation.name],
//         memories: ["memory1", "memory2", "memory3"],
//         visited: true,
//         visitedDate: 17-10-2023,
//         rating: 4,
//       });
//     // city.save();
//     expect(city.recommendations).toBe(["rec1"]);
//   });

//   it("has an arrays of memories", () => {
//     const city = new City({
//         name: "cityname",
//         recommendations: ["rec1", "rec2", "rec3"],
//         memories: ["memory1", "memory2", "memory3"],
//         visited: true,
//         visitedDate: 17-10-2023,
//         rating: 4,
//       });
//     expect(city.memories).toEqual(["memory1", "memory2", "memory3"]);
//   });

// it("has a visited date", () => {
//     const city = new City({
//         name: "cityname",
//         recommendations: ["rec1", "rec2", "rec3"],
//         memories: ["memory1", "memory2", "memory3"],
//         visited: true,
//         visitedDate: new Date(2023, 0, 1),
//         rating: 4,
//       });
//     expect(city.visitedDate).toBe(2023-01-01T00:00:00.000Z);
//   });

  it("has a visited equal to true", () => {
    const city = new City({
        name: "cityname",
        recommendations: ["rec1", "rec2", "rec3"],
        memories: ["memory1", "memory2", "memory3"],
        visited: true,
        visitedDate: new Date(2023, 0, 1),
        rating: 4,
      });
    expect(city.visited).toBe(true);
  });

  it("has a visited date", () => {
    const city = new City({
        name: "cityname",
        recommendations: ["rec1", "rec2", "rec3"],
        memories: ["memory1", "memory2", "memory3"],
        visited: true,
        visitedDate: 17-10-2023,
        rating: 4,
      });
    expect(city.rating).toBe(4);
  });
});
