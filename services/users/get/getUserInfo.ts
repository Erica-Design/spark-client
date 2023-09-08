import axios from "axios";

const getUserInfo = async (id: number) => {
  try {
    const res = await axios.get(
      `https://xq13ns6jwd.execute-api.us-east-1.amazonaws.com/prod/users/${id}`,
    );
    return res.data;
  } catch (e) {
    console.log(e);
    alert("정보를 가져오는데 실패했습니다. 관리자에게 문의 바랍니다.");
    return null;
  }
};

export default getUserInfo;
