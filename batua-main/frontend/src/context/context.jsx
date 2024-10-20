import { createContext, useEffect, useState } from "react";

export const AllContext = createContext();

export const AllContextProvider = ({ children }) => {
  const [date, setDate] = useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  );
  const [dailyExpense, setDailyExpense] = useState([]);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [lastMonthExpense, setLastMonthExpense] = useState(0);
  const [lastMonthFamilyExpense, setLastMonthFamilyExpense] = useState(0);
  const [monthlyFamilyExpense, setMonthlyFamilyExpense] = useState(0);
  const [dailyFamilyExpense, setDailyFamilyExpense] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signedUser, setSignedUser] = useState({});
  const [isFamily, setIsFamily] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lineGraphData, setLineGraphData] = useState([]);
  const [familyLineGraphData, setFamilyLineGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [todaysKharcha, setTodaysKharcha] = useState(0);
  const [yesterdayKharcha, setYesterdayKharcha] = useState(0);
  const getMe = async () => {
    try {
      const res = await fetch(`/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setIsLoggedIn(true);
        setSignedUser(data);
      }
    } catch (err) {}
  };

  const getDailyData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/transaction/getdailyexpense`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: date,
          }),
        }
      );

      const data = await res.json();
      setDailyExpense(data);
    } catch (err) {}
  };

  const getDailyKharcha = async () => {
    try {
      const res = await fetch(
        `/api/transaction/getDailyKharcha`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: date,
          }),
        }
      );
      const data = await res.json();
      setTodaysKharcha(data);
    } catch (error) {}
  };

  const getYesterdayKharcha = async () => {
    try {
      const res = await fetch(
        `/api/transaction/getDailyKharcha`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: new Date(date).getFullYear() + "-" + (new Date(date).getMonth()+1) + "-" + (new Date(date).getDate()-1),
          }),
        }
      );
      const data = await res.json();
      setYesterdayKharcha(data);
    } catch (error) {}
  };
  

  const getMonthlyExpense = async () => {
    try {
      const res = await fetch(
        `/api/transaction/getmonthlyexpense`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: date,
          }),
        }
      );

      const data = await res.json();
      setMonthlyExpense(data);
    } catch (err) {}
  };

  const getLastMonthExpense = async () => {
    try {
      const res = await fetch(
        `/api/transaction/getLastMonthExpense`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: date,
          }),
        }
      );

      const data = await res.json();
      setLastMonthExpense(data.lastMonthExpense);
    } catch (err) {}
  };

  const getLastMonthFamilyExpense = async () => {
    try {
      const res = await fetch(
        `/api/transaction/getLastMonthFamilyExpense`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: date,
          }),
        }
      );

      const data = await res.json();
      setLastMonthFamilyExpense(data.lastMonthExpense);
    } catch (err) {}
  };

  const getmonthlyFamilyexpense = async () => {
    try {
      const res = await fetch(
        `/api/transaction/getmonthlyfamilyexpense`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: date,
          }),
        }
      );

      const data = await res.json();
      setMonthlyFamilyExpense(data);
    } catch (err) {}
  };

  const getDailyFamilyExpense = async () => {
    try {
      const res = await fetch(
        `/api/transaction/getdailyfamilyexpense`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: date,
          }),
        }
      );

      const data = await res.json();
      setDailyFamilyExpense(data);
    } catch (err) {}
  };

  const getLineData = async () => {
    try {
      const res = await fetch(
        `/api/transaction/getLineGraphData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: date,
          }),
        }
      );

      const data = await res.json();
      setLineGraphData(data);
    } catch (err) {}
  };

  const getFamilyLineGraphData = async () => {
    try {
      const res = await fetch(
        `/api/transaction/getFamilyLineGraphData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: date,
          }),
        }
      );

      const data = await res.json();
      setFamilyLineGraphData(data);
      setIsLoading(false);
    } catch (err) {}
    setIsLoading(false);
  };

  useEffect(() => {
    getDailyData();
    getMonthlyExpense();
    getmonthlyFamilyexpense();
    getDailyFamilyExpense();
    getLineData();
    getLastMonthExpense();
    getLastMonthFamilyExpense();
    getFamilyLineGraphData();
    getDailyKharcha();
    getYesterdayKharcha()
  }, [date, signedUser]);

  useEffect(() => {
    getMe();
  }, [isLoggedIn]);

  return (
    <AllContext.Provider
      value={{
        date,
        setDate,
        dailyExpense,
        monthlyExpense,
        isLoggedIn,
        setIsLoggedIn,
        signedUser,
        setSignedUser,
        monthlyFamilyExpense,
        dailyFamilyExpense,
        isFamily,
        setIsFamily,
        darkMode,
        setDarkMode,
        lineGraphData,
        familyLineGraphData,
        isLoading,
        showMenu,
        setShowMenu,
        lastMonthExpense,
        lastMonthFamilyExpense,
        todaysKharcha,
        yesterdayKharcha
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
