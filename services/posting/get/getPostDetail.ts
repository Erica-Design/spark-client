import axios from "axios";

const getPostDetail = async (id: number) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    let response;
    if (accessToken) {
      response = await axios.get(
        `https://xq13ns6jwd.execute-api.us-east-1.amazonaws.com/prod/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } else {
      response = await axios.get(
        `https://xq13ns6jwd.execute-api.us-east-1.amazonaws.com/prod/posts/${id}`,
      );
    }
    return response.data;
  } catch (e) {
    console.log(e);
    alert("데이터 로딩에 실패하였습니다. 관리자에게 문의해주세요.");
    return null;
  }
};

export default getPostDetail;

// https://xq13ns6jwd.execute-api.us-east-1.amazonaws.com/prod/posts/best -> 스파크 픽 디자인
// https://xq13ns6jwd.execute-api.us-east-1.amazonaws.com/prod/users/me or /users/1 -> 마이페이지 데이터
