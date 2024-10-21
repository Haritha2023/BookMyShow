const { axiosInstance } = require("./index");

//Register new user

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/users/register", value);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Login user

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/users/login", value);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//get current user from the frontend
// need to hit the userrouter at server from the frontend

export const GetCurrentUser = async () => {
  const token = localStorage.getItem("token");
  
  try {
    const response = await axiosInstance.get("/api/users/get-current-user",{
      headers: {
        Authorization: `Bearer ${token}` // Attach token in headers
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
