import axios from "axios";

const deleteScrap = async (id: number) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.delete(
      `https://xq13ns6jwd.execute-api.us-east-1.amazonaws.com/prod/users/scrap/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (e) {
    return null;
  }
};

export default deleteScrap;
