import axios from "axios";
import { BASE_URL } from "@services/base";

const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, userData);
    return response.data;
  } catch (e: any) {
    alert(e.response.data.message);
    return null;
  }
};

export default registerUser;
