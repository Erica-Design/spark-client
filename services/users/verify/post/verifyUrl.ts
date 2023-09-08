import axios from "axios";

const verifyUrl = async (data: string, type: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/users/verify-url`,
      {
        data,
        type,
      },
    );
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
