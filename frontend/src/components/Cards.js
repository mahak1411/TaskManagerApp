import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

import axios from "axios";

const Cards = ({home,inputDiv,setInputDiv,data, setUpdatedData}) => {
  const headers = {id : localStorage.getItem("id") , authorization : `Bearer ${localStorage.getItem("token")}`}
  const handleComplete = async (id)=>{
    try{
      await axios.put(`http://localhost:1000/api/v2/updateCompletedTask/${id}` ,{}, {headers})
    }catch(error){

    }
  }
  const handleImpTask = async (id)=>{
      try{
        await axios.put(`http://localhost:1000/api/v2/updateImpTask/${id}` ,{}, {headers})
      }catch(error){
        console.log(error);
      }
    
  }

  const handleDeleteTask = async (id)=>{
    try{
      await axios.delete(`http://localhost:1000/api/v2/deleteTask/${id}` , {headers})
    }catch(error){
      console.log(error);
    }
}

  const handleUpdate = (id,title,desc)=>{
    setInputDiv("fixed"); 
    setUpdatedData({id : id , title:title , desc : desc})
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data &&
        data.map((items, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-gray-800 rounded-md p-4 my-1"
          >
            <div>
              <h2 className="font-semibold text-lg my-1 border-b py-1 border-gray-500">
                {items.title}
              </h2>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`p-2 rounded w-3/6 font-semibold ${
                  items.complete === false
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={()=>handleComplete(items._id)}
              >
                {items.complete === true ? "Completed" : "Incomplete"}
              </button>

              <div className="text-white p-2 w-3/6 text-xl flex justify-around">
                <button className="hover:text-green-500" onClick={()=>handleImpTask(items._id)}>
                  {items.important === false ? <FaRegHeart /> : <FaHeart className="text-green-500"/>}
                </button>
                {home !== false && <button className="hover:text-blue-500" onClick={()=>handleUpdate(items._id,items.title , items.desc)}>
                  <FaEdit />
                </button>}
                
                <button className="hover:text-red-500" onClick={()=>handleDeleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
        {home &&
        <button className="flex flex-col justify-center items-center bg-gray-800 rounded-md p-4 my-1 border border-dashed border-gray-500 hover:scale-105 hover:cursor-pointer transition-all duration-300" onClick={()=> setInputDiv("fixed")}>
        <h2 className="text-4xl my-2 text-gray-400 hover:text-white ">
          <IoIosAddCircleOutline />
        </h2>
        <h4 className="text-gray-400 hover:text-white ">Add new Task</h4>
      </button>
        }
      
    </div>
  );
};

export default Cards;
