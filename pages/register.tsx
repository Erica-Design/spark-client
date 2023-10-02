import { useQuery } from "@tanstack/react-query";
import useMobile from "@hooks/useMobile";
import getDepartments from "@services/departments/get/getDepartments";
import MobileRegister from "@components/mobile/pages/register";
import DesktopRegister from "@components/desktop/pages/register";
import BaseLayout from "@components/base/layout";
import CircularProgress from "@mui/material/CircularProgress";

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

  if (isLoading)
    return (
      <div className="flex justify-center pt-[50vh] ">
        <CircularProgress />
      </div>
    );

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
