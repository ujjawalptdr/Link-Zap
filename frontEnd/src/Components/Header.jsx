import React, { useContext, useEffect, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import StyledButton from "./StyledButton";
import { UserContext } from "./Contexts/UserContext";

import PopoverAvatar from "./PopoverAvatar";


function Header({ login, setLogin, signup, setSignup, showMenu, setShowMenu, setAbout, setHome }) {
  const { user } = useContext(UserContext);


  return (
    <div className=" w-full h-14 text-white">
      <div className="flex justify-between px-4 lg:px-16 m-4 items-center">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Link<span className="text-themeOrange">Zap</span>
        </h1>

        <div className="flex gap-2 items-center sm:hidden">
          <div onClick={() => { setShowMenu(!showMenu) }} className=" cursor-pointer"><RiMenu3Line className="size-8" /></div>
          {user ? <PopoverAvatar /> : <StyledButton label={"Login"} onClick={() => setLogin(!login)} />}
        </div>
        <ul className="hidden sm:flex gap-5 md:gap-10 items-center font-medium">
          <li className="hover:scale-105 duration-200 cursor-pointer">
            <span onClick={() => { setAbout(false); setHome(true) }}>Home</span>
          </li>
          <li className="hover:scale-105 duration-200 cursor-pointer">
            <span onClick={() => { setAbout(true); setHome(false) }}>About</span>
          </li>

          {
            user ? <PopoverAvatar /> : <div className="flex gap-2">
              <StyledButton label={"Signup"} onClick={() => setSignup(!signup)} />
              <StyledButton label={"Login"} onClick={() => setLogin(!login)} />
            </div>
          }

        </ul>
      </div>
    </div >
  );
}

export default Header;
