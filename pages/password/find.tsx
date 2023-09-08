import useMobile from "@hooks/useMobile";
import MobileFind from "@components/mobile/pages/password-find";
import BaseLayout from "@components/base/layout";
// import DesktopFind from "../../page/desktop/find/page";

export default function FindPassword() {
  const isMobile = useMobile();

  return (
    <BaseLayout
      isMobile={isMobile}
      isMenu={false}
      isSideBar={false}
      isHeader={true}
      isFooter={false}
    >
      {isMobile ? <MobileFind /> : null}
    </BaseLayout>
  );
}
