const { axiosInstance } = require("./index");

//Add a movie

export const addMovie = async (values) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", values);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//get all movies
export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
