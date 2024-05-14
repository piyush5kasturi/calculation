import { useState } from "react";
import { tabSlug } from "./helper";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import BurgerIcon from "../../assets/ui-icons/burger.svg?react";
import Close from "../../assets/ui-icons/close.svg?react";
import React from "react";
const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-10">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* logo section */}
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <span>Calculation Pro</span>
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? (
            <Close
              className={classNames(
                "cursor-pointer transition-all fill-current"
              )}
            />
          ) : (
            <BurgerIcon className="w-5 h-5 fill-current" />
          )}
        </div>
        {/* linke items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-50 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {tabSlug.map((link, index) => (
            <li
              key={index}
              className="md:ml-8 md:my-0 my-7 font-semibold"
              onClick={() => setOpen(!open)}
            >
              <Link
                to={link.route}
                className={classNames(
                  "text-gray-800 hover:text-[#00D936] duration-500",
                  {
                    "!text-[#00D936]": location.pathname.endsWith(
                      link.route === "/" ? "create" : link.route
                    ),
                  }
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Header;
