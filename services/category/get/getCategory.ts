import axios from "axios";
import { BASE_URL } from "@services/base";

const getCategory = async () => {
  try {
    const response = await axios.get<string[]>(`${BASE_URL}/categories`);
    return response.data;
  } catch (e) {
    console.log(e);
    alert("데이터 로딩에 실패하였습니다. 관리자에게 문의해주세요.");
    return [];
  }
};

export default getCategory;
