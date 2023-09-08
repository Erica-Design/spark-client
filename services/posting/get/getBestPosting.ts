import axios from "axios";

const getBestPosting = async () => {
  try {
    // 데이터가 있는 경우에만 카테고리 값을 포함하는 URL 생성
    const response = await axios.get(
      `https://xq13ns6jwd.execute-api.us-east-1.amazonaws.com/prod/posts/best`,
    );
    return response.data;
  } catch (e) {
    console.log(e);
    alert("데이터 로딩에 실패하였습니다. 관리자에게 문의해주세요.");
    return [];
  }
};

export default getBestPosting;
