import React, { useEffect } from 'react'
import { useState } from 'react';
import Cards from '../components/Cards'
import { IoIosAddCircleOutline } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from 'axios';
const AllTask = () => {
  const [inputDiv , setInputDiv] = useState("hidden");
    const [Data,setData] = useState()
    const [updatedData , setUpdatedData] = useState({id:"" ,title : "" ,  desc : ""})
  const headers = {id : localStorage.getItem("id") , authorization : `Bearer ${localStorage.getItem("token")}`}
  useEffect(()=>{
    const fetch = async ()=>{
      const response =   await axios.get("http://localhost:1000/api/v2/allTasks",{headers});
      setData(response.data.data);
    }
    fetch();
  })

  return (
    <>
    <div>
      <div className="w-full flex justify-end px-4 py-2 text-4xl text-gray-400 hover:text-white transition-all duration-300">
      <button onClick={()=>setInputDiv("fixed")}><IoIosAddCircleOutline/></button>
      </div>
      {Data && <Cards home={true} inputDiv={inputDiv} setInputDiv={setInputDiv} data = {Data.tasks} setUpdatedData={setUpdatedData}/> } 
    </div>
    <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} updatedData={updatedData} setUpdatedData={setUpdatedData} />
    </>
  )
}

export default AllTask
