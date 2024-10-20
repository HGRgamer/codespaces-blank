import { LiaRupeeSignSolid } from "react-icons/lia";
import { CiMoneyBill } from "react-icons/ci";
import { VscGraph } from "react-icons/vsc";
import { useContext, useState } from "react";
import { AllContext } from "../context/context";
import { ContinuousColorLegend } from "@mui/x-charts";
import { GoGraph } from "react-icons/go";
import { RecentExpenses } from "./RecentExpenses";
import { AddExpense } from "./AddExpense";
import { HiChartPie } from "react-icons/hi2";
import { FaCoins } from "react-icons/fa";
import { Analytics } from "./Analytics";

export const Individual = () => {
  const context = useContext(AllContext);
  const dailyExpense = context.dailyExpense;
  const lineGraphData = context.lineGraphData.data;
  const [isAnalytics, setIsAnalytics] = useState(false);
  const categoryData = [
    {
      name: "Food",
      value: context.monthlyExpense.food,
    },
    {
      name: "Clothing",
      value: context.monthlyExpense.clothing,
    },
    {
      name: "Travel",
      value: context.monthlyExpense.travel,
    },
    {
      name: "Entertainment",
      value: context.monthlyExpense.entertainment,
    },
    {
      name: "Other",
      value: context.monthlyExpense.other,
    },
  ];
  return (
    <div className="flex flex-col w-full ">
      <div className="block items-center justify-center md:flex mt-8">
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
            {context.monthlyExpense.monthlyExpense
              ? context.monthlyExpense.monthlyExpense
              : 0}
          </div>
          <div className="mt-1 items-center flex text-lg text-accent">
            {context.lastMonthExpense === 0
              ? "No expense Last month"
              : context.monthlyExpense.monthlyExpense
              ? Math.round(
                  ((context.monthlyExpense.monthlyExpense -
                    context.lastMonthExpense) /
                    context.lastMonthExpense) *
                    100 *
                    100
                ) /
                  100 +
                "% from last month"
              : "-100% from last month"}{" "}
          </div>
        </div>
        <div className="md:w-1/3 mt-3 md:mt-0 h-full border-2 border-border bg-secondary flex md:mx-2 flex-col p-4 py-8 rounded-xl">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold">Today's Expense</p>
            </div>
            <div className="flex items-center justify-center">
              <LiaRupeeSignSolid className="text-lg text-accent" />
            </div>
          </div>
          <div className="mt-8 items-center flex text-3xl font-bold">
            <LiaRupeeSignSolid />
            {context.todaysKharcha}
          </div>
          <div className="mt-1 items-center flex text-lg text-accent">
            {context.yesterdayKharcha === 0
              ? "No expense yesterday"
              : context.todaysKharcha
              ? Math.round(
                  ((context.todaysKharcha -
                    context.yesterdayKharcha) /
                    context.yesterdayKharcha) *
                    100 *
                    100
                ) /
                  100 +
                "% from yesterday"
              : "-100% from yesterday"}
          </div>
        </div>
        <div className="md:w-1/3 h-full border-2 mt-3 md:mt-0 border-border w-full bg-secondary flex md:mx-2 flex-col p-4 py-8 rounded-xl">
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
            {Math.round((context.monthlyExpense.monthlyExpense / 30) * 100) /
            100
              ? Math.round((context.monthlyExpense.monthlyExpense / 30) * 100) /
                100
              : 0}
          </div>

          <div className="mt-1 items-center flex text-lg text-accent">
            {context.lastMonthExpense === 0
              ? "No expense Last month"
              : context.monthlyExpense.monthlyExpense
              ? Math.round(
                  ((context.monthlyExpense.monthlyExpense -
                    context.lastMonthExpense) /
                    context.lastMonthExpense) *
                    100 *
                    100
                ) /
                  100 +
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
            {context.monthlyExpense.type ? context.monthlyExpense.type : "N/A"}
          </div>
          <div className="mt-1 items-center flex text-lg text-accent">
            <LiaRupeeSignSolid />
            {context.monthlyExpense.typeAmount
              ? context.monthlyExpense.typeAmount
              : 0}{" "}
            spent on{" "}
            {context.monthlyExpense.type ? context.monthlyExpense.type : "N/A"}
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
      {!isAnalytics && <AddExpense />}
      {isAnalytics && (
        <Analytics lineGraphData={lineGraphData} categoryData={categoryData} />
      )}
    </div>
  );
};
