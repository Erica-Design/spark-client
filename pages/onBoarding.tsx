import useMobile from "@hooks/useMobile";
import MobileOnBoarding from "@components/mobile/pages/onBoarding";
import BaseLayout from "@components/base/layout";
import DesktopOnBoarding from "@components/desktop/pages/onBoarding";
import { useEffect } from "react";

export default function MyPage() {
  const isMobile = useMobile();

  useEffect(() => {
    const hasVisitedOnBoarding = localStorage.getItem("visitedOnBoarding");
    const now = new Date();

    // 만약 hasVisitedOnBoarding 이 존재하지 않거나 24시간이 지났다면
    if (
      !hasVisitedOnBoarding ||
      (hasVisitedOnBoarding &&
        now.getTime() - new Date(hasVisitedOnBoarding).getTime() > 24 * 60 * 60)
    ) {
      localStorage.setItem("visitedOnBoarding", now.toString());
    }
  });

  return (
    <BaseLayout
      isMobile={isMobile}
      isHeader={false}
      isSideBar={false}
      isFooter={false}
    >
      {isMobile ? <MobileOnBoarding /> : <DesktopOnBoarding />}
    </BaseLayout>
  );
}
