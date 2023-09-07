import React, { Fragment } from "react";
import MobileHeader from "@components/mobile/header";
import MobileFooter from "@components/mobile/footer";
import Header from "@components/desktop/header";
import Footer from "@components/desktop/footer";
import SideBar from "@components/desktop/sidebar";
import MobileClose from "@icons/mobileclose";
import MobileMenu from "@components/mobile/menu";

interface BaseLayoutProps {
  isMobile: boolean;
  isSideBar?: boolean;
  isHeader?: boolean;
  isMenu?: boolean;
  isFooter?: boolean;
  isCloseButton?: boolean;
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  isMobile,
  isSideBar = true,
  isHeader = true,
  isMenu = true,
  isFooter = true,
  isCloseButton = true,
  children,
}) => {
  if (isMobile) {
    return (
      <Fragment>
        {isHeader && <MobileHeader>
          {isMenu && <MobileMenu />}
          {isCloseButton && <MobileClose />}
        </MobileHeader>}
        {children}
        {isFooter && <MobileFooter />}
      </Fragment>
    );
  }
  return (
    <Fragment>
      {isHeader && (
        <div className="float-right pt-7 px-9">
          <Header />
        </div>
      )}
      {/*  Sidebar */}
      {isSideBar && (
        <div className="mt-7 mx-9">
          <SideBar />
        </div>
      )}
      <div className={`${isSideBar && "pl-[20%]"}`}>{children}</div>
      <div>{isFooter && <Footer />}</div>
    </Fragment>
  );
};

export default BaseLayout;
