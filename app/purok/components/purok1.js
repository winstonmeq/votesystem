
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import axios from 'axios';


function Purok1() {

  const [datalist, setdatalist] = useState([]);    
  const [loading, setLoading] = useState(true);


  useEffect(() => {   

    async function FetchData() {

        const prkname = 'Purok1'

      try {

      const { data } = await axios.get(process.env.LOCAL_URL + `/api/dashboard/${prkname}`)
      setdatalist(data);
      setLoading(false);

      console.log(data)

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
           
  }
 
    FetchData();
    }, []);


    const p1 = (Pname,x,y,z) => {
    
  
      if (x >= y && x >= z) {
      
        return <div style={{margin:'5px' , width:'100px', height:'100px', backgroundColor:'red', borderRadius: '10px'}}>
        
        <div className='text-white p-2 font-bold'><Link href={`/purok/${Pname}`}>{Pname}</Link></div>
        
        </div>
      } else if (y >= x && y >= z) {
        return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'blue' , borderRadius: '10px'}}>
        <div className='text-white p-2 font-bold'><Link href={`/purok/${Pname}`}>{Pname}</Link></div>
        </div>
  
      } else {
        return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'green' , borderRadius: '10px'}}>
        <div className='text-white p-2 font-bold'><Link href={`/purok/${Pname}`}>{Pname}</Link></div>
        </div>
  
      } 
  
   
    }



    if (loading) {
      return <div className="flex justify-center min-h-screen">Loading...</div>;
    }
  

  return (
    <div>
       {datalist.map((item, i) => (
              <div key={item}>{p1(item.PName, item.RedBox,item.BlueBox,item.GreenBox)}</div>
            ))}
    </div>
  )
}

export default Purok1