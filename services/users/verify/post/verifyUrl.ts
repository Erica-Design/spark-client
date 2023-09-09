import axios from "axios";
import { BASE_URL } from "@services/base";

const verifyUrl = async (data: string, type: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/verify-url`, {
      data,
      type,
    });
    if (type === "reset-password") {
      return response.data;
    }
    return response.status === 200;
  } catch (e: any) {
    console.log(e);
    return null;
  }
};

export default verifyUrl;
