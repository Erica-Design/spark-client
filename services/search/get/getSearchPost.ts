import axios from "axios";
import { Post } from "@utils/types";
import { BASE_URL } from "@services/base";

const getSearchPost = async (search: string | string[] | undefined) => {
  try {
    const response = await axios.get<Post[]>(
      `${BASE_URL}/posts/search?keyword=${search}`,
    );
    return response.data;
  } catch (e) {
    console.log(e);
    alert("데이터 로딩에 실패하였습니다. 관리자에게 문의해주세요.");
    return [];
  }
};

export default getSearchPost;
