import useMobile from "@hooks/useMobile";
import MobileOnBoarding from "@components/mobile/pages/onBoarding";
import BaseLayout from "@components/base/layout";
import DesktopOnBoarding from "@components/desktop/pages/onBoarding";

export default function MyPage() {
  const isMobile = useMobile();

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
