import axios from "axios";

const root = "https://jewelry-final-project-1aposngto-alejandrocabezacarsi.vercel.app/api/api/";



export const loginMe = async (credentials) => {

  console.log(credentials)

  return await axios.post(`${root}login`, credentials);
  
};

export const getUserInfoByToken = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    return await axios.get(`${root}getUserInfoByToken`, config);
  }

export const registerUser = async (userData) => {

  console.log(userData)

  return await axios.post(`https://jewelry-final-project-1aposngto-alejandrocabezacarsi.vercel.app/api/api/register`, userData)

}

export const getAllOrdersByUserID = async (token, id) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return await axios.post(`${root}getAllOrdersByUserID`, {id:id}, config)

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

  export const getAllDeletedUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  return await axios.get(`${root}getAllDeletedUsers`, config);
}


export const restoreUser = async (token, id) => {

  const config = {
      
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }


  return await axios.post(`${root}restoreAccount`, {id:id}, config)

}

export const getUserDataByID = async (token, id) => {

  const config = {
      
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  return await axios.post(`${root}getUserDataByID`, {id:id}, config)
}
export const getOneDeletedUserByID = async (token, id) => {

  const config = {
      
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  return await axios.post(`${root}getOneDeletedUserByID`, {id:id}, config)
}


export const destroyUser = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = { id: id }; 



  return await axios.delete(`${root}destroyUser`, { data: data, ...config });
};


export const getAllProducts = async () => {

  return await axios.get(`${root}getAllProducts`)
}

export const createOrder = async (token, productIds)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios.post(`${root}createOrder`, {"product":productIds}, config);

}

export const getAllTypes = async () => {

  return await axios.get(`${root}getAllTypes`)
}

export const getAllProductsFiltered = async (typeSelected, name, diamonds ) => {


  const data ={
    typeSelected,
    name,
    diamonds
  
  }

  return await axios.post(`${root}getAllProductsFiltered`, data)

}



