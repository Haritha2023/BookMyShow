const express = require("express");
var cors = require("cors");

require("dotenv").config();

const dbConfig = require("./config/dbConfig");

const PORT = 8088;

const app = express();

const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theatres", theatreRoutes);

app.listen(PORT, () => {
  console.log("server running");
});
