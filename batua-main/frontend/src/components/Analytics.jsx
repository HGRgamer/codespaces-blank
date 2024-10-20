import { LineChart, Line, Pie, PieChart, Cell } from "recharts";
import { AllContext } from "../context/context";
import { useContext } from "react";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



export const Analytics = (lineGraphData) => {
  const context = useContext(AllContext);
  const LineGraphData = lineGraphData.lineGraphData;
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  const categoryData = lineGraphData.categoryData
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col rounded-xl border-2 border-border w-full h-full p-2 md:p-6 bg-secondary  md:flex mt-8">
        <strong className="md:text-3xl text-xl font-algerian  font-bold">
          Expense Trend
        </strong>
        <p className="md:text-lg text-md mb-7 text-accent">
          Your daily expense over time {"(last 10 days)"}
        </p>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            width={1300}
            height={500}
            data={LineGraphData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line strokeWidth={2} dataKey="totalExpense" stroke="#0b1214" />
            
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="md:flex block w-full">
        <div className="flex flex-col md:w-1/2 rounded-xl md:mx-3 p-2 md:p-6 border-2 border-border bg-secondary  md:flex mt-8">
          <strong className="md:text-3xl text-xl font-algerian  font-bold">
            Top Expenses
          </strong>
          <p className="md:text-lg text-md mb-7 text-accent">
            Your highest spending categories {"(This month)"}
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              className=""
              width={1300}
              height={500}
              data={categoryData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              
              <Bar
                dataKey="value"
                fill="#8884d8"
                activeBar={<Rectangle fill="#707070" stroke="white" />}
                barSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col md:w-1/2 rounded-xl md:mx-3 md:p-6 p-2 border-2 border-border bg-secondary  md:flex mt-8">
          <strong className="md:text-3xl text-xl font-algerian  font-bold">
            Expense by category
          </strong>
          <p className="text-lg mb-7 text-accent">
            Distribution of your expenses {"(This month)"}
          </p>
          
          <ResponsiveContainer width="100%" height={400}>
            <PieChart width={800} height={800}>
            <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  
                  <Legend />
            </PieChart>
            </ResponsiveContainer>
            
        </div>
      </div>
    </div>
  );
};
