const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const cors = require("cors");
const request = require("request");
const got = require("got");
const HTMLParser = require("node-html-parser");
const items = require("./routes/api/items");

const app = express();
app.use(express.json());
app.use(cors());

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
