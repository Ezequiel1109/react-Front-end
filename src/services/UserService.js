import apiUser from "../config/axiosConfig";

export const register = async (userData) => {
  try {
    console.log("=== REGISTER USER ===");
    console.log("UserData received:", userData);

    const response = await apiUser.post("user/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    console.log("=== LOGIN USER SERVICE ===");
    console.log("credentials recibido:", credentials);

    const response = await apiUser.post("user/login", {
      email: credentials.email,
      password: credentials.password
    });
    return response.data.token;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () =>{
  try{
    const response = await apiUser.get(`user/me`);
    return response.data;
  }catch(error){
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
}; 
