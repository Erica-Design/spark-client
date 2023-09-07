import React from "react";
import useMobile from "@hooks/useMobile";
import DesktopLoginPage from "@components/desktop/pages/login";
import MobileLoginPage from "@components/mobile/pages/login";
import BaseLayout from "@components/base/layout";

export default function Login() {
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const isMobile = useMobile();

  if (accessToken) return (window.location.href = "/");

  return (
    <BaseLayout
      isMobile={isMobile}
      isHeader={isMobile}
      isFooter={false}
      isSideBar={false}
    >
      {isMobile ? <MobileLoginPage /> : <DesktopLoginPage />}
    </BaseLayout>
  );
}
