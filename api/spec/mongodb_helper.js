var mongoose = require("mongoose");

beforeAll(function () {
  return mongoose.connect("mongodb://0.0.0.0/MyPlace_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.on("open", function () {;
  });
});
})

afterAll(function () {
  return mongoose.connection.close(true);
});
