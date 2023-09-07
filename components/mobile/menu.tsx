import MobileLogo from "@icons/mobilelogo";
import React from "react";
import MobileMypageButton from "@icons/mobilemypage";
import MobileLoginButton from "@icons/mobileloginbutton";
import useUser from "@hooks/useUser";



const MobileMenu = () => {
    const user = useUser();

    return (
        <div className="flex flex-row ml-auto">
            {user ? (
                <MobileMypageButton buttonImg={user.departmentCode} userId={user.id} />
            ) : (
                <MobileLoginButton />
            )}
        </div>
    );
};

export default MobileMenu;
