import React from 'react'
import Cards from '../components/Cards'
import { useEffect , useState} from 'react';
import axios from 'axios';
const CompleteTask = () => {
  const [Data,setData] = useState();
  const headers = {id : localStorage.getItem("id") , authorization : `Bearer ${localStorage.getItem("token")}`}
  useEffect(()=>{
    const fetch = async ()=>{
      const response =   await axios.get("http://localhost:1000/api/v2/completeTask",{headers});
      setData(response.data.data);
    }
    fetch();
  })
  return (
    <div>
      <Cards home={false} data={Data}/>
    </div>
  )
}

export default CompleteTask
