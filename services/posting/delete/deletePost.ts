import axios from "axios";
import { BASE_URL } from "@services/base";

const deletePost = async (id: number) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    return await axios.delete(`${BASE_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (e) {
    return null;
  }
};

export default deletePost;
