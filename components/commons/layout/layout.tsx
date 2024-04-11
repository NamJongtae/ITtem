import React from "react";
import Header from "./layout-header";
import Footer from "./layout-footer";
import MobileNav from "./nav/layout-mobile-nav";

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      {children}
      <MobileNav />
      <Footer />
    </>
  );
}
