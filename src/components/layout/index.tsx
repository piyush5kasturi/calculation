import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../header";
import React from "react";
export default function Layout() {
  const location = useLocation();
  return (
    <>
      <Header />
      <div className="mt-[100px] md:mt-[90px] mx-10 mb-10">
        {location.pathname === "/" ? <Navigate to="/master" /> : <Outlet />}
      </div>
    </>
  );
}
