import { axiosInstance } from "./index";

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

//update movie
export const updateMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/update-movie",
      payload
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

//delete movie
export const deleteMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/delete-movie",
      payload
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

// Get a single movie by its id
export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/movies/movie/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};
