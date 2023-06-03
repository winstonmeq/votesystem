import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";


function Purok5() {
  const [datalist, setdatalist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function FetchData() {

      const prkname = "Purok5";

      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/purok/${prkname}`
        );
        setdatalist(data);
        setLoading(false);

        console.log(data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    FetchData();
  }, []);

  const p1 = (Pname,x, y, z) => {
    if (x >= y && x >= z) {
      return (
        <div
          style={{
            margin: "5px",
            width: "100px",
            height: "100px",
            backgroundColor: "red",
            borderRadius: '10px'
          }}
        >
        <div className='text-white p-2 font-bold'><Link href={`/purok/${Pname}`}>{Pname}</Link></div>
        </div>
      );
    } else if (y >= x && y >= z) {
      return (
        <div
          style={{
            margin: "5px",
            width: "100px",
            height: "100px",
            backgroundColor: "Blue",
            borderRadius: '10px'
          }}
        >
        <div className='text-white p-2 font-bold'><Link href={`/purok/${Pname}`}>{Pname}</Link></div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            margin: "5px",
            width: "100px",
            height: "100px",
            backgroundColor: "green",
            borderRadius: '10px'
          }}
        >
        <div className='text-white p-2 font-bold'><Link href={`/purok/${Pname}`}>{Pname}</Link></div>
        </div>
      );
    }
  };

  return (
    <div>
      {datalist.map((item, i) => (
        <div key={item}>{p1(item.PName,item.RedBox, item.BlueBox, item.GreenBox)}</div>
      ))}
    </div>
  );
}

export default Purok5;
