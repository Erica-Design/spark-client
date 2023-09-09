import axios from "axios";
import { BASE_URL } from "@services/base";

const requestPassword = async (userData: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/request-modify`,
      userData,
    );
    return response.status === 200;
  } catch (e: any) {
    alert(e.response.data.message);
    return null;
  }
};

export default requestPassword;
