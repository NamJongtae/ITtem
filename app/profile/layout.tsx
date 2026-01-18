import { Suspense } from "react";

interface IProps {
  children: React.ReactNode;
  edit: React.ReactNode;
  changePassword: React.ReactNode;
}

export default function Layout({ children, edit, changePassword }: IProps) {
  return (
    <>
      <Suspense fallback={<></>}>{edit}</Suspense>
      <Suspense fallback={<></>}>{changePassword}</Suspense>
      {children}
    </>
  );
}
