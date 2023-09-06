import MobileLogo from "@icons/mobilelogo";
import React from "react";
import MobileMypageButton from "@icons/mobilemypage";
import MobileLoginButton from "@icons/mobileloginbutton";
import useUser from "@hooks/useUser";

const MobileHeader = () => {
  const user = useUser();

  return (
    <div className="flex flex-row m-2">
      <MobileLogo />
      <div>
        <h1 className="font-['SUIT'] font-normal text-[0.56rem] mt-1">
          SPARK:
        </h1>
        <h1 className="font-['SUIT'] font-bold text-[0.56rem] mt-[-0.3rem] flex">
          <span className="font-normal mr-1">ERICA DESIGN</span> ARCHIVING
        </h1>
      </div>
      {user ? (
        <MobileMypageButton buttonImg={user.departmentCode} userId={user.id} />
      ) : (
        <MobileLoginButton />
      )}
    </div>
  );
};

export default MobileHeader;
