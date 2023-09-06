import Link from "next/link";
import React, { useEffect } from "react";
import { IUserData } from "@hooks/useUser";

interface LoginButtonProps {
  user: IUserData | null;
  ref: any;
  open: () => void;
  close: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  user,
  ref,
  open,
  close,
}) => {
  const handleClickOutside = (e: any) => {
    if ((ref?.current && !!ref.current) || ref?.current?.contains(e.target)) {
      close();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (user)
    return (
      <div
        onClick={open}
        className="font-bold border-[1px] border-black w-9 h-9 flex justify-center items-center text-base cursor-pointer"
      >
        {user.departmentCode}
      </div>
    );
  return (
    <Link href="/login">
      <div className="font-['Pretendard'] font-bold border-[1px] border-black w-20 h-9 flex justify-center items-center text-sm cursor-pointer">
        LOG-IN
      </div>
    </Link>
  );
};

export default LoginButton;
