import axios from "axios";

const getCategory = async () => {
  try {
    const response = await axios.get<string[]>(
      `https://xq13ns6jwd.execute-api.us-east-1.amazonaws.com/prod/categories`,
    );
    return response.data;
  } catch (e) {
    console.log(e);
    alert("데이터 로딩에 실패하였습니다. 관리자에게 문의해주세요.");
    return [];
  }
};

export default getCategory;
