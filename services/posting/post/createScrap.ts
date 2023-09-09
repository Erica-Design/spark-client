import axios from "axios";
import { BASE_URL } from "@services/base";

const createScrap = async (id: number) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `${BASE_URL}/users/scrap/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (e: any) {
    alert(e.response.data.message);
    return null;
  }
};

export default createScrap;
