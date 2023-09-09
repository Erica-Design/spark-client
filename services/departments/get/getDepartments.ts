import axios from "axios";
import { BASE_URL } from "@services/base";

const getDepartments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/departments`);
    return response.data;
  } catch (e) {
    console.log(e);
    alert("정보를 가져오는데 실패했습니다. 관리자에게 문의 바랍니다.");
    return null;
  }
};

export default getDepartments;
