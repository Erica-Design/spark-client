import useMobile from "@hooks/useMobile";
import BaseLayout from "@components/base/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import verifyUrl from "@services/users/verify/post/verifyUrl";
import MobileReset from "@components/mobile/pages/password-reset";
import CircularProgress from "@mui/material/CircularProgress";

export default function FindPassword() {
  const isMobile = useMobile();
  const router = useRouter();
  const [studentNumber, setStudentNumber] = useState<string>("");

  useEffect(() => {
    if (router.query.data) {
      const data = router.query.data;
      verifyUrl(data as string, "reset-password").then((response) => {
        if (response) {
          setStudentNumber(response.message ?? "");
        } else {
          alert("유효하지 않은 링크입니다.");
        }
      });
    }
  }, [router]);

  if (studentNumber === "")
    return (
      <div className="flex justify-center pt-[50vh] ">
        <CircularProgress />
      </div>
    );

  return (
    <BaseLayout
      isMobile={isMobile}
      isMenu={false}
      isSideBar={false}
      isHeader={true}
      isFooter={false}
    >
      {isMobile ? <MobileReset studentNumber={studentNumber} /> : null}
    </BaseLayout>
  );
}
