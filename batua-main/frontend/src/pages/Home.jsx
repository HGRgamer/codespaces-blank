import { useContext, useState } from "react";
import { TbUser, TbUsers } from "react-icons/tb";
import { CardDiv, Individual } from "../components/Individual";
import { VscGraph } from "react-icons/vsc";
import { GoGraph } from "react-icons/go";
import { RecentExpenses } from "../components/RecentExpenses";
import { AllContext } from "../context/context";
import { Family } from "../components/Family";
import { Hero } from "../components/Hero";

export const Home = () => {
  const context = useContext(AllContext);

  return (
    <>
      {!context.isLoading && (
        <>
          {!context.isLoggedIn && <Hero />}
          {context.isLoggedIn && (
            <div
              className="w-full flex-col flex items-center justify-center"
              onClick={() => context.setShowMenu(false)}
            >
              {context.isLoading && (
                <div className="flex flex-col items-center h-11/12 justify-center  w-11/12 mt-8">
                  <strong className="text-4xl font-algerian font-bold">
                    Loading....
                  </strong>
                  <p className="text-xl">Bunch of data is being fetched</p>
                </div>
              )}
              {!context.isLoading && (
                <div className="flex flex-col justify-center  w-11/12 mt-8">
                  <div className="md:flex grid items-center justify-center md:items-start md:justify-between">
                    <strong className="text-3xl font-algerian font-bold">
                      Comprehensive Expense Tracker
                    </strong>
                    <input
                      type="date"
                      value={context.date}
                      onChange={(e) => context.setDate(e.target.value)}
                      className="rounded-xl w-5/12 mt-4 md:mt-0 md:w-auto p-2"
                    ></input>
                  </div>
                  <div className="md:w-5/6 w-full flex self-center items-center mt-5">
                    <div
                      onClick={() => context.setIsFamily(false)}
                      className={`text-lg cursor-pointer flex items-center justify-center ${
                        context.isFamily
                          ? "text-accent"
                          : "bg-secondary rounded-lg border border-border"
                      } w-1/2 text-center font-semibold`}
                    >
                      <TbUser className="mx-1" /> Individual
                    </div>
                    <div
                      onClick={() => context.setIsFamily(true)}
                      className={`text-lg cursor-pointer flex items-center justify-center ${
                        context.isFamily
                          ? "bg-secondary rounded-lg border border-border"
                          : "text-accent"
                      } font-semibold w-1/2 text-center`}
                    >
                      <TbUsers className="mx-1" /> Family
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    {!context.isFamily && <Individual />}
                    {context.isFamily && <Family />}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
      {context.isLoading && (
        <div className="flex flex-col items-center w-full mt-8">
          <strong className="md:text-4xl text-3xl font-algerian font-bold">
            Loading....
          </strong>
          <p className="text-xl">Bunch of data is being fetched</p>
          <img src="https://res.cloudinary.com/dkhymc3li/image/upload/v1728847252/output-onlinegiftools_mipoti.gif" className="rounded-xl mt-5 w-full md:w-5/12"/>
        </div>
      )}
    </>
  );
};
