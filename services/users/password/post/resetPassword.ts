import axios from "axios";

interface ResetPasswordData {
  studentNumber: string;
  password: string;
}

const resetPassword = async (resetData: ResetPasswordData) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/users/update-password`,
      resetData,
    );
    return response.status === 200;
  } catch (e: any) {
    return e;
  }
};

export default resetPassword;
