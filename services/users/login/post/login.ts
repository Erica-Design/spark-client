import axios from "axios";

const login = async (userData: any) => {
  try {
    const response = await axios.post(
      `https://xq13ns6jwd.execute-api.us-east-1.amazonaws.com/prod/users/login`,
      userData,
    );
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    window.location.href = "/";
    return response.data;
  } catch (e: any) {
    alert("로그인에 실패했습니다. 관리자에게 문의해주세요");
    return null;
  }
};

export default login;
