'use client'
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import axios from 'axios';


function Status_p1() {

  const [datalist, setdatalist] = useState([]);    
  const [loading, setLoading] = useState(true);


  useEffect(() => {   

    async function FetchData() {

      try {

      const { data } = await axios.get(process.env.LOCAL_URL + `/api/statusP`)

      setdatalist(data);
      setLoading(false);

      console.log('status', data)

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
           
  }
 
    FetchData();
    }, []);


    const ProgressBar = (Pname,min, max) => {

      const percentage = ((min / max  ) * 100).toFixed(0);

    
      return (
        <div className="flex flex-wrap w-full items-center justify-center">
          <div>
              {Pname} 
          </div>

          <div className="bg-black flex-1 m-2 rounded-lg" style={{ width: '200px' }}>
          <div className="bg-orange-900 justify-center text-white text-sm rounded-lg" style={{ width: `${percentage}%` }}>
            
          <div className="text-center">{min}</div>
            
          </div>

          </div>
         
          <div>{max}</div>

        </div>
      );
    };
    

    if (loading) {
      return (
        <div className="flex flex-row">Loading</div>
        
        )
    }
    
  

  return (
    <div>
    
       {datalist.map((item, i) => (
              <div key={i}>{ProgressBar(item._id,item.member_yes,item.total.length,)}</div>
            ))}
         
    </div>
  )
}

export default Status_p1