const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// MongoDB
require("./database");

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", require("./routes/products"));
app.use("/api", require("./routes/user"));


app.get("/api", function (req, res) {
  return res.json({
    status: "API enabled",
  });
});


 // Server is listening
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
