const express = require("express");
var cors = require("cors");

require("dotenv").config();

const dbConfig = require("./config/dbConfig");

const PORT = 8088;

const app = express();

const userRoutes = require("./routes/userRoutes");
const movieRoute = require("./routes/movieRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoute);

app.listen(PORT, () => {
  console.log("server running");
});
