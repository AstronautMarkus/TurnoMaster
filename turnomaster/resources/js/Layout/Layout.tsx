import React, { ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Layout.css";


interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default Layout;