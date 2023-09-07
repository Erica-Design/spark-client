import useMobile from "@hooks/useMobile";
import getUserInfo from "@services/users/get/getUserInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "@components/base/layout";
import MobileUserPage from "@components/mobile/pages/users";
import DesktopUserPage from "@components/desktop/pages/users";
import { IUserDetailData } from "@hooks/useUser";

export default function UserPage() {
  const router = useRouter();
  const isMobile = useMobile();
  const [userData, setUserData] = useState<IUserDetailData | null>(null);

  useEffect(() => {
    if (router.query.id) {
      getUserInfo(+router.query.id).then((response) => setUserData(response));
    }
  }, [router.isReady, router.query]);

  return (
    <BaseLayout isMobile={isMobile}>
      {isMobile ? (
        <MobileUserPage userData={userData} />
      ) : (
        <DesktopUserPage userData={userData} />
      )}
    </BaseLayout>
  );
}
