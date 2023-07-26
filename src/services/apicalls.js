import axios from "axios";

const root = "http://localhost:8000/api/";

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

export const getAllOrdersByUserID = async (token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return await axios.get(`${root}getAllOrdersByUserID`, config)

}


export const updateUser = async (token, data) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return await axios.put(`${root}update`,data, config)

}

export const updatePassword = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return await axios.put(`${root}updatePassword`, data, config);
}

export const getAllUsers = async (token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return await axios.get(`${root}getAllUsers`,config);


}

export const getAllRoles = async (token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return await axios.get(`${root}getAllRoles`,config);


}

// export const getAllUsersFiltered = async (token, role_ID) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };

  
//   const data = {
//     role_ID: role_ID
//   };
//   console.log(config)
//   console.log(data)
  
//   return await axios.post(`${root}getAllUsersFiltered`, data, config);
// }

export const getAllUsersFiltered = async (token, roleSelected, nameOrEmail, ) => {

    const data ={
      roleSelected,
      nameOrEmail,
    
    }

    const config = {
      
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    return await axios.post(`${root}getAllUsersFiltered`, data, config)

  }
