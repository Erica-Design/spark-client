import axios from "axios";
import { BASE_URL } from "@services/base";

const uploadFiles = async (title, type, thumbnail, categories, images) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await axios.post(
      `${BASE_URL}/posts`,
      {
        title,
        type,
        thumbnail,
        categories,
        images,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res;
  } catch (e) {
    console.log(e);
    alert("파일 업로드에 실패하였습니다.");
    return null;
  }
};

export default uploadFiles;
