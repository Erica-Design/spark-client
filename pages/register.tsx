import { useQuery } from "@tanstack/react-query";
import useMobile from "@hooks/useMobile";
import getDepartments from "@services/departments/get/getDepartments";
import MobileRegister from "@components/mobile/pages/register";
import DesktopRegister from "@components/desktop/pages/register";
import BaseLayout from "@components/base/layout";

interface JwtToken {
  accessToken: string;
  refreshToken: string;
}

export default function Login() {
  const isMobile = useMobile();

  const { data: departments, isLoading } = useQuery({
    queryFn: getDepartments,
    queryKey: ["departments"],
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <BaseLayout
      isMobile={isMobile}
      isFooter={false}
      isMenu={false}
      isSideBar={!isMobile}
      isHeader={isMobile}
    >
      {isMobile ? (
        <MobileRegister departments={departments} />
      ) : (
        <DesktopRegister departments={departments} />
      )}
    </BaseLayout>
  );
}
