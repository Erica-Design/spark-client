import {useEffect, useState} from "react";
import getMyInfo from "@services/users/me/get/getMyInfo";

interface IUserData {
    id: number;
    departmentCode: string;
    shortStudentNumber: string;
    username: string;
}

const useUser = () => {
    const accessToken = typeof window !== "undefined" && localStorage.getItem("accessToken");
    const [userData, setUserData] = useState<IUserData | null>(null);

    useEffect(() => {
        if (accessToken) {
            getMyInfo().then((response) => {
                if (response) {
                    setUserData(response);
                }
            });
        }
    }, [accessToken]);

    return userData;
}

export default useUser;