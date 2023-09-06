import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

const useMobile = (): boolean => {
    const [mobile, setMobile] = useState<boolean>(false);
    useEffect(() => {
        const width = document.documentElement.clientWidth;
        setMobile(isMobile || width < 768);
    }, []);
    return mobile;
};

export default useMobile;