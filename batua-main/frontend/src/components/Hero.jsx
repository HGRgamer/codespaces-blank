import { GoGraph } from "react-icons/go";
import { VscGraph } from "react-icons/vsc";
import { RiPieChartLine } from "react-icons/ri";
import { TbCategory, TbUsers } from "react-icons/tb";
import { FaRupeeSign } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { MdOutlineTabletAndroid } from "react-icons/md";
import { MdLaptopWindows } from "react-icons/md";
import { IoTabletLandscapeSharp } from "react-icons/io5";

export const Hero = () => {
  return (
    <div className="w-full flex-col flex items-center justify-center">
      <div className="w-full bg-primary flex flex-col ">
        <div className="md:flex grid px-8 py-6 mt-7 space-y-6">
          <div className="flex flex-col text-center md:text-start md:w-1/2">
            <strong className="md:text-[4rem] text-[2rem] font-algerian tracking-tight font-bold  text-textcol">
              Master Your Finances with Smart Expense Tracking
            </strong>
            <p className="text-2xl text-accent">
              Take control of your spending and achieve your financial goals
              with our intuitive and powerful expense tracker.
            </p>
            <button className="bg-textcol self-center md:self-start text-secondary px-4 py-2 md:w-1/4  hover:scale-110 border-4 border-textcol  mt-4 rounded-md text-lg md:text-xl">
              <NavLink to={"/signup"}>Get Started</NavLink>
            </button>
          </div>
          <div className="grid md:grid-cols-2 md:w-1/2 gap-4">
            <div className="flex flex-col hover:scale-105 cursor-default items-center justify-center p-8 shadow-xl bg-secondary rounded-xl w-full ">
              <VscGraph className="text-[3.5rem]" />
              <strong className="text-xl font-algerian font-bold text-textcol">
                Expense Analytics
              </strong>
              <p className="text-xl text-accent">
                Visualize your spending patterns
              </p>
            </div>
            <div className="flex flex-col hover:scale-105 cursor-default items-center justify-center p-8 shadow-xl bg-secondary rounded-xl w-full ">
              <RiPieChartLine className="text-[3.5rem]" />
              <strong className="text-xl font-algerian font-bold text-textcol">
                Spending Insights
              </strong>
              <p className="text-xl text-accent">
                Understand your financial habits
              </p>
            </div>
            <div className="flex flex-col hover:scale-105 cursor-default items-center justify-center p-8 shadow-xl bg-secondary rounded-xl w-full ">
              <TbCategory className="text-[3.5rem]" />
              <strong className="text-xl font-algerian font-bold text-textcol">
                Expense Categories
              </strong>
              <p className="text-xl text-accent">Categorize your expenses</p>
            </div>
            <div className="flex flex-col hover:scale-105 cursor-default items-center justify-center p-8 shadow-xl bg-textcol rounded-xl w-full ">
              <TbUsers className="text-[3.5rem] text-primary" />
              <strong className="text-xl font-algerian font-bold text-primary">
                Family Sharing
              </strong>
              <p className="text-xl text-secondary">
                Manage expenses as a household
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-secondary justify-center items-center p-8 flex flex-col ">
        <strong className="md:text-3xl text-2xl font-algerian font-bold text-textcol">
          How it works
        </strong>
        <div className="md:flex grid md:space-x-6 mt-6 justify-center items-center p-5 md:px-16">
          <div className="flex flex-col items-center justify-center p-8 bg-primary/90 rounded-xl w-full md:w-1/3 ">
            <FaRupeeSign className="text-4xl bg-primary/90 " />
            <strong className="text-xl font-algerian font-bold text-textcol">
              Log your Expenses
            </strong>
            <p className="text-xl mt-5 text-accent">
              Easily input your daily expenses and categorize them with just a
              few taps.
            </p>
          </div>
          <div className="flex flex-col items-center mt-6 md:mt-0 justify-center p-8  bg-primary/90 rounded-xl w-full md:w-1/3 ">
            <GoGraph className="text-4xl bg-primary/90 " />
            <strong className="text-xl font-algerian font-bold text-textcol">
              Analyze your spend
            </strong>
            <p className="text-xl mt-5 text-accent">
              View detailed reports and charts to understand your spending
              habits better.
            </p>
          </div>
          <div className="flex flex-col items-center mt-6 md:mt-0 justify-center p-8 bg-primary/90 rounded-xl w-full md:w-1/3 ">
            <RiPieChartLine className="text-4xl bg-primary/90 " />
            <strong className="text-xl font-algerian font-bold text-textcol">
              Make Informed Decisions
            </strong>
            <p className="text-xl mt-5 text-accent">
              Use insights to make better financial choices and optimize your
              spending.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-primary justify-center items-center p-8 flex flex-col">
      <strong className="md:text-3xl text-2xl font-algerian font-bold text-textcol">
          Key Features
        </strong>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 justify-center items-center md:p-5 md:px-16">
          <div className="flex flex-col cursor-default justify-center p-2 md:p-8 h-full shadow-xl bg-secondary rounded-xl w-full ">
           
            <strong className="md:text-xl text-lg font-algerian font-bold text-textcol">
            Expense Categorization
            </strong>
            <p className="md:text-xl text-lg mt-6 text-accent">
            Automatically categorize your expenses for easy tracking and analysis.
            </p>
          </div>
          <div className="flex flex-col cursor-default justify-center p-2 h-full md:p-8 shadow-xl bg-secondary rounded-xl w-full ">
           
            <strong className="md:text-xl text-lg font-algerian font-bold text-textcol">
            Spending Trends
            </strong>
            <p className="md:text-xl text-lg mt-6 text-accent">
            Visualize your spending trends over time with interactive charts and graphs.
            </p>
          </div>
          <div className="flex flex-col cursor-default justify-center p-2 h-full md:p-8 shadow-xl bg-secondary rounded-xl w-full ">
           
            <strong className="md:text-xl text-lg font-algerian font-bold text-textcol">
            Family Expense Sharing
            </strong>
            <p className="md:text-xl text-lg mt-6 text-accent">
            Share and manage household expenses with family members.
            </p>
          </div>
          <div className="flex flex-col cursor-default justify-center p-2 h-full md:p-8 shadow-xl bg-secondary rounded-xl w-full ">
           
            <strong className="md:text-xl text-lg font-algerian font-bold text-textcol">
            Secure Data Storage
            </strong>
            <p className="md:text-xl text-lg mt-6 text-accent">
            Your financial data is protected with bank-level encryption.
            </p>
          </div>
          <div className="flex flex-col cursor-default justify-center p-2 h-full md:p-8 shadow-xl bg-secondary rounded-xl w-full ">
           <div className="md:flex grid items-center">
            <strong className="md:text-xl text-lg font-algerian font-bold text-textcol">
            Export Functionality 
            </strong>
            <p className="text-sm font-thin text-center text-accent">{"  (Coming Soon)"}</p>
            </div>
            <p className="md:text-xl text-lg mt-6 text-accent">
            Export your expense data for use in other financial tools or for tax purposes.
            </p>
          </div>
          <div className="flex flex-col cursor-default justify-center p-2 h-full md:p-8 shadow-xl bg-secondary rounded-xl w-full ">
          <div className="md:flex grid items-center">
            <strong className="md:text-xl text-lg font-algerian font-bold text-textcol">
            Customisable Reports
            </strong>
            <p className="text-sm font-thin text-center text-accent">{"  (Coming Soon)"}</p>
            </div>
            <p className="md:text-xl text-lg mt-6 text-accent">
            Generate custom reports to gain deeper insights into your spending habits.
            </p>
          </div>
          
        </div>
        <div className="flex flex-col mt-8 justify-center items-center">
            <strong className="text-2xl font-algerian font-bold text-textcol">
            Available on all devices
            </strong>
            <div className="flex mt-4 justify-center items-center">
                <MdOutlinePhoneAndroid className="md:text-7xl text-5xl text-textcol hover:text-accent" />
                <IoTabletLandscapeSharp className="md:text-7xl text-5xl mr-4 text-textcol hover:text-accent" />
                <MdLaptopWindows className="md:text-7xl text-5xl text-textcol hover:text-accent" />
            </div>
        </div>
      </div>
    </div>
  );
};
