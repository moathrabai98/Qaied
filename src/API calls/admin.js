  import axios from "axios";

  const token = localStorage.getItem("token");
  const header = { headers: { Authorization: `Bearer ${token}` } };

  export const getAllUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/getAllUser",
        header
      )

      return response.data.data.users;
    } catch (error) {
      console.error("Error while fetching all users: ", error);
      throw error;
    }
  };
  export const getPendingRequest = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/systemReport",
        header
      )

      return response.data.data.findPendingRequestsCount;
    } catch (error) {
      console.error("Error while fetching PendingRequests: ", error);
      throw error;
    }
  };
  export const getAllProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/getAllProduct",
          header
        );
    
        return response.data.data.products;
      } catch (error) {
        console.error("Error while fetching all products: ", error);
        throw error;
      }
    };
    export const deleteProductAdmin = async (_id) => {
      const data = {
        productId: _id,
  
      };
      const response = await axios.delete(
        `http://localhost:8000/api/users/deleteProductAdmin`,  
        { data: data }
      );
      return response;
    };