
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import axios from 'axios';


function Purok_5() {

  const [datalist, setdatalist] = useState([]);    
  const [loading, setLoading] = useState(true);


  useEffect(() => {   

    async function FetchData() {

        const prkname = 'Purok5'

      try {

      const { data } = await axios.get(process.env.LOCAL_URL + `/api/purok5`)

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


    const p1 = (Pname, x, y, z) => {
      if (x >= y && x >= z) {
        return (
          <div
            style={{
              margin: '5px',
              width: '20px',
              height: '20px',
              backgroundColor: 'red',
              borderRadius: '10px',
              '@media (max-width: 800px)': {
                width: '60px',
                height: '60px',
              },
            }}
          >
            <div className='text-white p-2 font-bold'>
              <Link href={`/purok/${Pname}`}>{Pname}</Link>
            </div>
          </div>
        );
      } else if (y >= x && y >= z) {
        return (
          <div
            style={{
              margin: '5px',
              width: '20px',
              height: '20px',
              backgroundColor: 'blue',
              borderRadius: '10px',
              '@media (max-width: 800px)': {
                width: '60px',
                height: '60px',
              },
            }}
          >
            <div className='text-white p-2 font-bold'>
              <Link href={`/purok/${Pname}`}>{Pname}</Link>
            </div>
          </div>
        );
      } else {
        return (
          <div
            style={{
              margin: '5px',
              width: '20px',
              height: '20px',
              backgroundColor: 'green',
              borderRadius: '10px',
              '@media (max-width: 800px)': {
                width: '60px',
                height: '60px',
              },
            }}
          >
            <div className='text-white p-2 font-bold'>
              <Link href={`/purok/${Pname}`}>{Pname}</Link>
            </div>
          </div>
        );
      }
    };
    



    if (loading) {
      return <div className="flex justify-center min-h-screen">Loading...</div>;
    }
  

  return (
    <div>
    
       {datalist.map((item, i) => (
              <div key={i}>{p1(item._id, item.member_yes,item.total.length - item.member_yes, 0)}</div>
            ))}
         
    </div>
  )
}

export default Purok_5