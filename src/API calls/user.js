import axios from "axios";

const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };

//logs in a user
export const login = async (data) =>
  await axios.post(`http://127.0.0.1:8000/api/users/login`, data);

//register a user
export const register = async (data) => {
  console.log("request sent.");
  await axios.post(`http://127.0.0.1:8000/api/users/signup`, data);
};

//get User details
export const userDetail = async (username) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/users/get_user_details/${username}`,
    header
  );
  return response;
};
export const GetAllProductNew = async () => {

   const response = await axios.get(`http://localhost:8000/api/users/getAllProductUser` , header);
   return response;
}
export const GetAllProductRandomly = async () => {

  const response = await axios.get(`http://localhost:8000/api/users/getAllProductUserRandomly` , header);
  return response;
}
//update user details
export const updateUser = async (data) => {
  const response = await axios.post(
    `http://127.0.0.1:8000/api/users/update_profile`,
    data,
    header
  );
  return response;
};
//send report
export const SendReport = async (data) => {
  const response = await axios.post(
    `http://127.0.0.1:8000/api/reports/create_new`,
    data,
    header
  );
  return response;
};
//delete user
  export const deleteUser = async (userId, username) => {
    const url = `http://localhost:8000/api/users/deleteuser/${userId}`;

    const data = {
      userId: userId,
      username: username,
    };

    try {
      const response = await axios.delete(url , {data} );
      return response;
    } catch (error) {
      console.error(`Error deleting user: \n ${error}`);
      throw error;
    }
  };
//update user details
export const clearCart = async () => {
  const response = await axios.post(
    `http://127.0.0.1:8000/api/users/clear_cart`,
    {},
    header
  );
  return response;
};
