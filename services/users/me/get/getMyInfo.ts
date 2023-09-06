import axios from "axios";

const getMyInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const response = await axios.get(`https://api.sparkhyu.com/users/info`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (e) {
        console.log(e);
        alert("정보를 가져오는데 실패했습니다. 관리자에게 문의 바랍니다.");
        return null;
    }
};

export default getMyInfo;
