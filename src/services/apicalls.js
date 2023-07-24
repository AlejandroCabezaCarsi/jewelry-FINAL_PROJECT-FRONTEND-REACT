import axios from "axios";

export const loginMe = async (credentials) => {

  return await axios.post(`http://localhost:8000/api/login`, credentials);
  
};

export const getUserInfoByToken = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    return await axios.get(`http://localhost:8000/api/getUserInfoByToken`, config);
  }

export const register = async (userData) => {

  return await axios.post("http://localhost:8000/api/register", userData)

}

