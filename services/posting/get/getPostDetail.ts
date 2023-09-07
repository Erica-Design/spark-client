import axios from "axios";

const getPostDetail = async (id: number) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    let response;
    if (accessToken) {
      response = await axios.get(`https://api.sparkhyu.com/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else {
      response = await axios.get(`https://api.sparkhyu.com/posts/${id}`);
    }
    return response.data;
  } catch (e) {
    console.log(e);
    alert("데이터 로딩에 실패하였습니다. 관리자에게 문의해주세요.");
    return null;
  }
};

export default getPostDetail;

// https://api.sparkhyu.com/posts/best -> 스파크 픽 디자인
// https://api.sparkhyu.com/users/me or /users/1 -> 마이페이지 데이터
