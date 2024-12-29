import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdImportantDevices } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { MdIncompleteCircle } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All Tasks",
      icon:<CgNotes/>,
      link:"/"
    },
    {
      title: "Important Tasks",
      icon : <MdImportantDevices/>,
      link:"/impTasks"
    },
    {
      title: "Completed Tasks",
      icon : <FaCheckDouble/>,
      link:"/completeTasks"
    },
    {
      title: "Incompleted  Tasks",
      icon:<MdIncompleteCircle/>,
      link : "/incompleteTasks"

    },
  ];
  const [Data,setData] = useState()
  const logOutBtn = ()=>{
    dispatch(authActions.logOut());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/login");
  }
  const headers = {id : localStorage.getItem("id") , authorization : `Bearer ${localStorage.getItem("token")}`}
  useEffect(()=>{
    const fetch = async ()=>{
      const response =   await axios.get("http://localhost:1000/api/v2/allTasks",{headers});
      setData(response.data.data);
    }
    fetch();
  },[])
  return (
   <>
      {Data && (
        <div>
        <h2 className='text-xl font-semibold'>{Data.username}</h2>
        <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
        <hr />
      </div>)}
      <div>
        {data.map((items,i ) =>(
          <Link to={items.link} className='my-4 flex items-center text-lg hover:bg-gray-600 p-2 rounded transition-all duration-300'>
             {items.icon} &nbsp; {items.title}
          </Link>
        ))}
      </div>

      <div>
        <button className="bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-600 w-full p-2 rounded transition-all duration-300" onClick={logOutBtn}>Log Out</button>
        </div>
        </>
  )
}

export default Sidebar;
