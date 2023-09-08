import axios from "axios";

const requestPassword = async (userData: any) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/users/request-modify`,
      userData,
    );
    return response.status === 200;
  } catch (e: any) {
    alert(e.response.data.message);
    return null;
  }
};

export default requestPassword;
