import React, { Fragment } from "react";
import Header from "./Header";

const Layout = ({ isReload, setIsReload, children }: any) => {
  return (
    <Fragment>
      <Header isReload={isReload} setIsReload={setIsReload}/>
      <div className="flex flex-col min-h-screen">
        <main style={{ minHeight: "calc(100vh - 726px)" }}>{children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
