import axios from "axios";
import { BASE_URL } from "@services/base";

interface ResetPasswordData {
  studentNumber: string;
  password: string;
}

const resetPassword = async (resetData: ResetPasswordData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/update-password`,
      resetData,
    );
    return response.status === 200;
  } catch (e: any) {
    return e;
  }
};

export default resetPassword;
