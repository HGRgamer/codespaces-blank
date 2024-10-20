import { useContext, useState } from "react";
import { TbUser } from "react-icons/tb";
import { TbUsers } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { AllContext } from "../context/context";

export const Navbar = () => {
    
  const context = useContext(AllContext);


  const handleLogOut = async () => {
    const res = await fetch(`/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    
    })
    if(res.ok){
      context.setIsLoggedIn(false);
      context.setSignedUser({});
      context.setShowMenu(false);
    }
  }
  return (
    <>
    <div className="h-12 z-[1] border-b-2 border-border w-full bg-secondary flex justify-between items-center px-10">
      <NavLink to={"/"}>
        <h1 className="text-2xl font-bold font-alata text-textcol">Batua</h1>
      </NavLink>
      {context.isLoggedIn && (
        <h1  className="text-xl text-textcol font-algerian">
          Hello,{" "}
          <strong onClick={() => context.setShowMenu(!context.showMenu)} className="cursor-pointer">{context.signedUser.name}</strong>{" "}
        </h1>
      )}
      {!context.isLoggedIn && (
        <NavLink to={"/signin"}>
          <h1 className="text-xl text-textcol font-algerian">Sign In </h1>
        </NavLink>
      )}

      
    </div>
    <div className={`text-center self-end ${context.showMenu ? "block" : "hidden"} z-[1] fixed top-12`}>
    <ul
      tabIndex={0}
      className="menu menu-xl border border-border rounded-xl dropdown-content bg-secondary rounded-box z-[1] w-52 p-2 shadow"

    >
      
      <li className="cursor-pointer">
        <a onClick={handleLogOut} className="text-lg">LogOut</a>
      </li>
    </ul>
  </div>
  </>
  );
};
