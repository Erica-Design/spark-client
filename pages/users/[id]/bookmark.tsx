import useMobile from "@hooks/useMobile";
import getUserInfo from "@services/users/get/getUserInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "@components/base/layout";
import DesktopUserPage from "@components/desktop/pages/users";
import { IUserDetailData } from "@hooks/useUser";
import MobileBookMarkPage from "@components/mobile/pages/bookmark";

export default function BookMarkPage() {
  const router = useRouter();
  const isMobile = useMobile();
  const [userData, setUserData] = useState<IUserDetailData | null>(null);

  useEffect(() => {
    if (router.query.id) {
      getUserInfo(+router.query.id).then((response) => setUserData(response));
    }
  }, [router.isReady, router.query]);

  return (
    <BaseLayout isMobile={isMobile} isMenu={false}>
      {isMobile ? (
        <MobileBookMarkPage userData={userData} />
      ) : (
        <DesktopUserPage userData={userData} id={Number(router.query.id)} />
      )}
    </BaseLayout>
  );
}
