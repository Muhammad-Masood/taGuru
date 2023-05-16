import { useState } from "react";

import { close, logo, menu, logo_ta } from "../assets";
import "./Navbar.css";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo_ta} alt="hoobank" className="w-[auto] h-[100px]" />
      <svg
        className="w-[124px] h-[32px]"
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="727.000000pt"
        height="188.000000pt"
        viewBox="0 0 727.000000 188.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0.000000,188.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path
            d="M1860 1205 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 -4 15 -10 15 -5 0
-10 -7 -10 -15z"
          />
          <path d="M1201 654 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z" />
        </g>
      </svg>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1 pr-20">
        {navLinks.map((nav, index) => (
          <div
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-6"}`}
            onClick={() => setActive(nav.title)}
          >
            <a style={{ color: "white" }} href={`#${nav.id}`}>
              {nav.title}
            </a>
          </div>
        ))}
        <div style={{ marginLeft: "20px", color: "white", fontSize: "16px" }}>
          <a target="_blank" href="https://muhammads-organization-8.gitbook.io/ta-guru/">
            Whitepaper
          </a>
        </div>
        <div
          style={{ color: "white", backgroundColor: "#62C4C8" }}
          className="login ml-5 bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          <a href="/login">Login</a>
        </div>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <div onClick={() => setToggle(!toggle)}>
          <img src={toggle ? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain" />
        </div>

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <div
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a style={{ color: "white" }} href={`#${nav.id}`}>
                  {nav.title}
                </a>
              </div>
            ))}
            <div style={{ color: "white", fontSize: "20px" }}>
              <a target="_blank" href="https://discordapp.com/channels/@me/1019903861848297572/1104472084433862746">
                Whitepaper
              </a>
            </div>
            <div style={{ color: "white", fontSize: "20px" }}>
              <a href="/login">Login</a>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
