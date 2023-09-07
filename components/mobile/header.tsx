import MobileLogo from "@icons/mobilelogo";
import React, { FC } from "react";

interface MobileHeaderProps {
  children?: React.ReactNode;
}

const MobileHeader: FC<MobileHeaderProps> = ({ children }) => {
  return (
    <div className="flex flex-row px-3.5 pt-7">
      <MobileLogo />
      <div>
        <h1 className="font-['SUIT'] font-normal text-[0.56rem] mt-1">
          SPARK:
        </h1>
        <h1 className="font-['SUIT'] font-bold text-[0.56rem] mt-[-0.3rem] flex">
          <span className="font-normal mr-1">ERICA DESIGN</span> ARCHIVING
        </h1>
      </div>
      {children}
    </div>
  );
};

export default MobileHeader;
