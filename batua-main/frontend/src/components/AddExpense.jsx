import { useState } from "react";

export const AddExpense = () => {
    const [loading, setLoading] = useState(false);
    const [serverResponse, setServerResponse] = useState("");
    const [expenseData, setExpenseData] = useState({
        description: "",
        amount: 0,
        type: "other",
    });
    const handleChange = (e) => {
        setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch(`/api/transaction/maketransaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(expenseData),
        })
        if(res.ok){
            setLoading(false);
            setExpenseData({ 
                description: "",
                amount: 0,
                type: "other"
            })
            window.location.reload();
        }
        setLoading(false)
        const data = await res.json();
        setServerResponse(data.message);
    };


  return (
    <div className="flex flex-col rounded-xl border-2 border-border w-full p-6 bg-secondary  md:flex mt-8">
        <strong className="md:text-3xl text-xl font-algerian  font-bold">
        Add Expense
      </strong>
      <p className="md:text-lg text-md mb-7 text-accent">
        Record a new Expense
      </p>
      <div className="grid self-center align-middle grid-cols-2 md:mx-4 md:w-11/12 gap-3 md:gap-6 justify-center items-center ">
        <div className="flex flex-col">
            <p className="text-lg">Description</p>
            <input value={expenseData.description} onChange={handleChange} name="description" placeholder="Expense description" className="border-2 placeholder:text-accent placeholder:font-algerian border-border rounded-xl  p-2" type="text" />
        </div>
        <div className="flex flex-col">
            <p className="text-lg">Amount</p>
            <input value={expenseData.amount} onChange={handleChange} name="amount" placeholder="0.0" className="border-2 placeholder:text-accent placeholder:font-algerian border-border rounded-xl  p-2" type="number" />
        </div>
        <div className="flex flex-col">
            <p className="text-lg">Description</p>
            <select value={expenseData.type} onChange={handleChange} name="type" className="p-2 font-algerian  bg-secondary border-2 border-border rounded-xl">
                <option value="food">Food</option>
                <option value="clothing">Clothing</option>
                <option value="travel">Travel</option>
                <option value="entertainment">Entertainment</option>
                <option defaultValue={true} value="other">Other</option>
            </select>
        </div>
        <div className="flex flex-col">
        <p className="text-lg">{"  "}</p>
        <button onClick={handleSubmit} className="border-2 hover:bg-accent bg-textcol font-algerian mt-6 text-[#ffffff] placeholder:text-accent placeholder:font-algerian border-border rounded-xl  p-2 ">{loading ? "Loading..." : "Add Expense"}</button>
        </div>
    </div>
        <p className="text-lg text-center mt-4 text-red">{serverResponse}</p>
    </div>
  );
};
