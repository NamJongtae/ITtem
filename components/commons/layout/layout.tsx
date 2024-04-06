import React from "react";
import Header from "./layout-header";
import Footer from "./layout-footer";

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
