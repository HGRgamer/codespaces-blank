import { LiaRupeeSignSolid } from "react-icons/lia";
import { CiMoneyBill } from "react-icons/ci";
import { VscGraph } from "react-icons/vsc";
import { useContext, useState } from "react";
import { AllContext } from "../context/context";
import { ContinuousColorLegend } from "@mui/x-charts";
import { GoGraph } from "react-icons/go";
import { RecentExpenses } from "./RecentExpenses";
import { TbUser, TbUsers } from "react-icons/tb";
import { HiChartPie } from "react-icons/hi2";
import { FaCoins } from "react-icons/fa";
import { Analytics } from "./Analytics";

export const Family = () => {
  const context = useContext(AllContext);
  const [familyId, setFamilyId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [svResponse, setSvResponse] = useState({});
  const dailyExpense = context.dailyFamilyExpense;
  const [isAnalytics, setIsAnalytics] = useState(false);
  const lineGraphData = context.familyLineGraphData.data;
  const categoryData = [
    {
      name: "Food",
      value: context.monthlyFamilyExpense.food,
    },
    {
      name: "Clothing",
      value: context.monthlyFamilyExpense.clothing,
    },
    {
      name: "Travel",
      value: context.monthlyFamilyExpense.travel,
    },
    {
      name: "Entertainment",
      value: context.monthlyFamilyExpense.entertainment,
    },
    {
      name: "Other",
      value: context.monthlyFamilyExpense.other,
    },
  ];

  const handleMakeFamily = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/auth/makeFamily`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    setSvResponse(data);
    if (res.ok) {
      setIsLoading(false);
      window.location.reload();
    }
    setIsLoading(false);
  };

  const handleJoinFamily = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/auth/joinfamily`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        familyId: familyId,
      }),
      credentials: "include",
    });
    const data = await res.json();
    setSvResponse(data);
    if (res.ok) {
      setIsLoading(false);
      window.location.reload();
    }
    setIsLoading(false);
  };

  return (
    <>
      {!context.signedUser.family && (
        <div className="md:flex block items-center justify-center w-full bg-secondary border-2 mt-8 border-border md:p-8 rounded-xl">
          <div className="flex flex-col md:w-1/2 mt-6 md:mt-0 items-center self-center justify-center md:pr-24 md:border-r-4 border-border">
            <img
              src="https://media1.tenor.com/m/aSkdq3IU0g0AAAAC/laughing-cat.gif"
              className="w-5/6 rounded-xl self-center"
            />
            <strong className="md:text-3xl text-xl text-center font-algerian font-bold">
              LMAO, orphan, no family?
            </strong>
          </div>
          <div className="flex flex-col md:w-1/2 md:pl-16 mt-7 items-center self-center justify-center">
            <div className="flex md:text-2xl text-xl font-bold font-algerian text-center flex-col border-b-2 border-border pb-8">
              Enter the family code to join
              <input
                type="number"
                value={familyId}
                onChange={(e) => setFamilyId(e.target.value)}
                className="rounded-xl p-2 border-2 border-border"
              />
              <button
                onClick={handleJoinFamily}
                className="bg-textcol text-secondary px-4 py-2   hover:scale-110 border-4 border-textcol  mt-4 rounded-md text-xl"
              >
                {isLoading ? "Loading..." : "Join"}
              </button>
            </div>
            <div className="mt-6 w-2/3 flex flex-col">
              <strong className="md:text-2xl text-xl text-center font-algerian font-bold">
                or create one{" "}
              </strong>
              <button
                onClick={handleMakeFamily}
                className="bg-textcol font-algerian text-secondary px-4 py-2 w-full  hover:scale-110 border-4 border-textcol rounded-md text-xl"
              >
                {isLoading ? "Loading..." : "Create"}
              </button>
            </div>
            <p className="text-lg text-red text-center mt-4">
              {svResponse.message ? svResponse.message : ""}
            </p>
          </div>
        </div>
      )}
      {context.signedUser.family && (
        <div className="flex flex-col w-full ">
          <div className="block w-full items-center justify-center md:flex mt-8">
            <div className="md:w-1/3 h-full border-2 border-border bg-secondary flex md:mx-2 flex-col p-4 py-8 rounded-xl">
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold">Total Monthly Expense</p>
                </div>
                <div className="flex items-center justify-center">
                  <LiaRupeeSignSolid className="text-lg text-accent" />
                </div>
              </div>
              <div className="mt-8 items-center flex text-3xl font-bold">
                <LiaRupeeSignSolid />
                {context.monthlyFamilyExpense.monthlyExpense
                  ? context.monthlyFamilyExpense.monthlyExpense
                  : 0}
              </div>
              <div className="mt-1 items-center flex text-lg text-accent">
                {context.lastMonthFamilyExpense === 0
                  ? "No expense Last month"
                  : context.monthlyFamilyExpense.monthlyExpense
                  ? Math.round(((context.monthlyFamilyExpense.monthlyExpense -
                    context.lastMonthFamilyExpense) /
                    context.lastMonthFamilyExpense) *
                    100 *100)/100 +
                    "% from last month"
                  : "-100% from last month"}
              </div>
            </div>
            <div className="md:w-1/3 h-full border-2 mt-3 md:mt-0 border-border bg-secondary flex md:mx-2 flex-col p-4 py-8 rounded-xl">
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold">Average daily spend</p>
                </div>
                <div className="flex items-center justify-center">
                  <FaCoins className="text-xl text-accent" />
                </div>
              </div>
              <div className="mt-8 items-center flex text-3xl font-bold">
                <LiaRupeeSignSolid />
                {Math.round(
                  (context.monthlyFamilyExpense.monthlyExpense / 30) * 100
                ) / 100
                  ? Math.round(
                      (context.monthlyFamilyExpense.monthlyExpense / 30) * 100
                    ) / 100
                  : 0}
              </div>

              <div className="mt-1 items-center flex text-lg text-accent">
                {context.lastMonthFamilyExpense === 0
                  ? "No expense Last month"
                  : context.monthlyFamilyExpense.monthlyExpense
                  ? Math.round(((context.monthlyFamilyExpense.monthlyExpense -
                    context.lastMonthFamilyExpense) /
                    context.lastMonthFamilyExpense) *
                    100 *100)/100  +
                    "% from last month"
                  : "-100% from last month"}
              </div>
            </div>
            <div className="md:w-1/3 border-2 mt-3 md:mt-0 border-border bg-secondary flex md:mx-2 flex-col p-4 py-8 rounded-xl">
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold">Top Category</p>
                </div>
                <div className="flex items-center justify-center">
                  <HiChartPie className="text-lg text-accent" />
                </div>
              </div>
              <div className="mt-8 items-center flex text-3xl font-bold">
                {context.monthlyFamilyExpense.type
                  ? context.monthlyFamilyExpense.type
                  : "N/A"}
              </div>
              <div className="mt-1 items-center flex text-lg text-accent">
                <LiaRupeeSignSolid />
                {context.monthlyFamilyExpense.typeAmount
                  ? context.monthlyFamilyExpense.typeAmount
                  : 0}{" "}
                spent on{" "}
                {context.monthlyFamilyExpense.type
                  ? context.monthlyFamilyExpense.type
                  : "N/A"}
              </div>
            </div>

            <div className="md:w-1/3 border-2 mt-3 md:mt-0 border-border bg-secondary flex md:mx-2 flex-col p-4 py-8 rounded-xl">
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold">Family Code</p>
                </div>
                <div className="flex items-center justify-center">
                  <TbUsers className="text-lg text-accent" />
                </div>
              </div>
              <div className="mt-8 items-center flex text-3xl font-bold">
                {context.signedUser.family}
              </div>
              <div className="mt-1 items-center flex text-lg text-accent">
                Use this to join this family
              </div>
            </div>
          </div>
          <div className="md:w-1/5 flex items-center mt-5">
            <div
              onClick={() => setIsAnalytics(false)}
              className={`text-lg cursor-pointer flex items-center justify-center ${
                isAnalytics
                  ? "text-accent"
                  : "bg-secondary rounded-lg border border-border"
              } w-1/2 text-center font-semibold`}
            >
              <VscGraph className="mx-2" /> Expense{" "}
            </div>
            <div
              onClick={() => setIsAnalytics(true)}
              className={`text-lg cursor-pointer flex items-center justify-center ${
                isAnalytics
                  ? "bg-secondary rounded-lg border border-border"
                  : "text-accent"
              } font-semibold w-1/2 text-center`}
            >
              <GoGraph className="mx-2" /> Analytics{" "}
            </div>
          </div>
          {!isAnalytics && <RecentExpenses dailyExpense={dailyExpense} />}
          {isAnalytics && (
            <Analytics
              lineGraphData={lineGraphData}
              categoryData={categoryData}
            />
          )}
        </div>
      )}
    </>
  );
};
