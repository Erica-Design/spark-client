import axios from "axios";

const deleteScrap = async (id: number) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const response = await axios.delete(
            `https://api.sparkhyu.com/users/scrap/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        return response.data;
    } catch (e) {
        return null;
    }
};

export default deleteScrap;
