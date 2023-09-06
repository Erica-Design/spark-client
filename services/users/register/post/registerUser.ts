import axios from "axios";

const registerUser = async (userData: any) => {
    try {
        const response = await axios.post(
            `https://api.sparkhyu.com/users/register`,
            userData,
        );
        return response.data;
    } catch (e: any) {
        alert(e.response.data.message);
        return null;
    }
};

export default registerUser;
