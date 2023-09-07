import React, { Fragment } from "react";
import MobileHeader from "@components/mobile/header";
import MobileFooter from "@components/mobile/footer";
import Header from "@components/desktop/header";
import Footer from "@components/desktop/footer";
import SideBar from "@components/desktop/sidebar";

interface BaseLayoutProps {
  isMobile: boolean;
  isSideBar?: boolean;
  isHeader?: boolean;
  isFooter?: boolean;
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  isMobile,
  isSideBar = true,
  isHeader = true,
  isFooter = true,
  children,
}) => {
  if (isMobile) {
    return (
      <Fragment>
        {isHeader && <MobileHeader />}
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
        <div className="pt-7 px-9">
          <SideBar />
        </div>
      )}
      <div className={`min-h-[100vh] ${isSideBar && "pl-[20%]"}`}>
        {children}
      </div>
      <div>{isFooter && <Footer />}</div>
    </Fragment>
  );
};

export default BaseLayout;
