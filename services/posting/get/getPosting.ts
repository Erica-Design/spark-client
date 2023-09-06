import axios from "axios";
import { Post } from "@utils/types";

const getPosting = async (categories: string[]) => {
  try {
    const response = await axios.get<Post[]>("https://api.sparkhyu.com/posts");
    return response.data;
  } catch (e) {
    console.log(e);
    alert("데이터 로딩에 실패하였습니다. 관리자에게 문의해주세요.");
    return [];
  }
};

export default getPosting;

// https://api.sparkhyu.com/posts/best -> 스파크 픽 디자인
// https://api.sparkhyu.com/users/me or /users/1 -> 마이페이지 데이터
