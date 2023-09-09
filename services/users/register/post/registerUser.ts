import axios from "axios";

const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(
      `https://xq13ns6jwd.execute-api.us-east-1.amazonaws.com/prod/users/register`,
      userData,
    );
    return response.data;
  } catch (e: any) {
    alert(e.response.data.message);
    return null;
  }
};

export default registerUser;
