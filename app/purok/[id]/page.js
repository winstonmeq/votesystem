
'use client'
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import Link from "next/link";

function Purok1({ params: { id } }) {

  const [datalist, setdatalist] = useState([]);    
  const [loading, setLoading] = useState(true);


  useEffect(() => {   

    async function FetchData() {
      try {

     //const purokname = "Purok 3";

      const { data } = await axios.get(process.env.LOCAL_URL + `/api/purok/${id}`)
      setdatalist(data);
      setLoading(false);

      console.log(data)

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
           
  }
 
    FetchData();
    }, [id]);


    const p1 = (x,y,z) => {
    
  
      if (x >= y && x >= z) {
      
        return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'red'}}>P1</div>

      } else if (y >= x && y >= z) {
        
        return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'yellow'}}>P1</div>
  
      } else {
        return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'green'}}>P1</div>
  
      } 
  
   
    }



  return (
    <div>
       {datalist.map((item, i) => (
              <div key={item}>{p1(item.RedBox,item.BlueBox,item.GreenBox)}
              
              <div>{id}</div>
              </div>
             
            ))}
    </div>
  )
}

export default Purok1