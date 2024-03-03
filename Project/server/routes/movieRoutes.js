const router = require("express").Router();
const Movie = require("../models/movieModel");

//Add movie
router.post("/add-movie", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "New movie has been added!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

//get all movies

router.get("/get-all-movies", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send({
      success: true,
      message: "All movies have been fetched!",
      data: allMovies,
    });
  } catch (error) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

//update movie

// router.put("/update-movie/:id", async (req, res) => {
//   try {
//     const movie = await Movie.findByIdAndUpdate(req.params.id);
//     res.send({
//       success: true,
//       message: "The movie has been updated",
//       data: movie,
//     });
//   } catch (err) {
//     success: false, console.log(err);
//   }
// });
//update the movie, delete the movie, update the movie
module.exports = router;
