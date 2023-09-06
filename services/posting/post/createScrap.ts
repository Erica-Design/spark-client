import axios from "axios";

const createScrap = async (id: number) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const response = await axios.post(
            `http://localhost:8080/users/scrap/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        return response.data;
    } catch (e: any) {
        alert(e.response.data.message);
        return null;
    }
};

export default createScrap;
