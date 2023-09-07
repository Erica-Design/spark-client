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

  // TODO: 포스트 페이지 북마크, 온보딩 페이지 useEffect 시간 처리, SparkStory 페이지 처리

  return (
    <BaseLayout isMobile={isMobile} isMenu={false}>
      {isMobile ? (
        <MobileUserPage userData={userData} id={Number(router.query.id)} />
      ) : (
        <DesktopUserPage userData={userData} id={Number(router.query.id)} />
      )}
    </BaseLayout>
  );
}
