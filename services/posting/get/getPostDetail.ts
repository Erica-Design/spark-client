import axios from "axios";

const getPostDetail = async (id: number) => {
    try {
        // 데이터가 있는 경우에만 카테고리 값을 포함하는 URL 생성
        const response = await axios.get(`https://api.sparkhyu.com/posts/${id}`);
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
