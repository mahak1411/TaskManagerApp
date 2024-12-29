import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const InputData = ({ inputDiv, setInputDiv, updatedData, setUpdatedData }) => {
    const [Data, setData] = useState({ title: "", desc: "" });
    useEffect(() => {
        setData({ title: updatedData.title, desc: updatedData.desc })
    }, [updatedData])
    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value })
    }
    const headers = { id: localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}` }

    const SubmitData = async () => {
        if (Data.title === "" || Data.desc === "") {
            alert("All field are required")
        } else {
            await axios.post("http://localhost:1000/api/v2/createTask", Data, { headers });
            setInputDiv("hidden");
        }

    }

    const updateTask =async ()=>{
        if (Data.title === "" || Data.desc === "") {
            alert("All field are required")
        } else {
            await axios.put(`http://localhost:1000/api/v2/updateTask/${updatedData.id}`, Data, { headers });
            setUpdatedData({id: "", title: "", desc: ""})
            setInputDiv("hidden");
        }
    }

    const resetBtn = () => {
        setData({ title: "", desc: "" })
    }
    return (
        <>
            <div className={`${inputDiv} top-0 left-0 bg-gray-900 opacity-80 h-screen w-full`}></div>
            <div className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className="w-2/6 bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-lg text-center">
                    <div className='mb-5 text-2xl flex justify-end'>
                        <button onClick={() => {
                            setInputDiv("hidden");
                            setUpdatedData({ id: "", title: "", desc: "" })
                        }} className='text-gray-500 hover:text-gray-50'><RxCross2 /></button>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter Title"
                        name="title"
                        className="p-3 w-full bg-gray-700 text-white border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none text-lg mb-4 rounded-md"
                        value={Data.title}
                        onChange={change}
                    />

                    <textarea
                        type="text"
                        placeholder="Enter description"
                        name="desc"
                        rows="6"
                        className="p-3 w-full bg-gray-700 text-white border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none text-lg mb-4 rounded-md"
                        value={Data.desc}
                        onChange={change}
                    />
                    {updatedData.id === "" ? 
                    <button className="bg-green-600 shadow-lg shadow-green-600/50 hover:bg-green-700 w-2/6 p-2 rounded transition-all duration-300 font-semibold" onClick={SubmitData}>Submit</button>:
                    <button className="bg-green-600 shadow-lg shadow-green-600/50 hover:bg-green-700 w-2/6 p-2 rounded transition-all duration-300 font-semibold" onClick={updateTask}>Update</button>
                    }
                    <button type='reset' className="bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-600 w-2/6 p-2 rounded transition-all duration-300 mx-2 font-semibold" onClick={resetBtn}>Reset</button>
                </div>
            </div >
        </>
    );
};

export default InputData;
