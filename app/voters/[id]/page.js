"use client";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

const Page = ({ params: { id } }) => {

  const [datalist2, setdatalist2] = useState([]);

  const [loading, setLoading] = useState(true);

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [age, setage] = useState("");
  const [position, setposition] = useState("");
  const [prec_num, setprec_num] = useState("");
  const [purok, setpurok] = useState("");
  const [member, setmember] = useState(0);


  const router = useRouter()



  useEffect(() => {
    async function FetchData() {
      try {
        const { data } = await axios.get(
          process.env.LOCAL_URL + `/api/voter/${id}`
        );

        console.log(data);

        if (data.length > 0) {
          setfname(data[0].fname);
          setlname(data[0].lname);
          setage(data[0].age);
          setposition(data[0].position);
          setprec_num(data[0].prec_num);
          setpurok(data[0].purok);
          setmember(data[0].member);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    async function FetchData2() {
      try {
        const { data } = await axios.get(process.env.LOCAL_URL + `/api/purok`);
        setdatalist2(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    FetchData();
    FetchData2();
  }, [id]);




  const updateVoter = async () => {
    try {
     
      setLoading(true); // Set isLoading to true when the request is initiated

      const payload = { fname, lname,age,position,prec_num, purok, member};

      const response = await axios.patch(process.env.LOCAL_URL + `/api/voter/${id}`,payload);

     
      router.push('/voters')

  
      console.log(response);

    } catch (error) {
      setLoading(false);

      console.log("error");
    } finally {
      setLoading(false); // Set isLoading to false when the request is completed or encounters an error
    }
  };




  
  const deleteVoter = async () => {
   

    try {

      setLoading(true); // Set isLoading to true when the request is initiated

      const response = await axios.delete(process.env.LOCAL_URL + `/api/voter/${id}`);

      router.push('/voters')
        
      console.log(response);
      
      return null

    } catch (error) {
      setLoading(false);

      console.log("error");
    } finally {
      setLoading(false); // Set isLoading to false when the request is completed or encounters an error
    }

  };





  if (loading) {
    return <div className="flex justify-center item-center min-h-screen ">Loading...</div>;
  }

  

  return (
    <div className="flex justify-center">
      <div className="flex-row w-full lg:w-3/4 m-4 bg-gray-50 p-4 rounded-lg">
        <form onSubmit={updateVoter}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={fname}
                onChange={(e) => setfname(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                First name
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={lname}
                onChange={(e) => setlname(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Last name
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={age}
                onChange={(e) => setage(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Age
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={position}
                onChange={(e) => setposition(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Position
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={prec_num}
                onChange={(e) => setprec_num(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Precinct Number
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Select Purok
              </label>

              <select
                value={purok}
                onChange={(e) => setpurok(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {datalist2.map((item, i) => (
                  <option key={i} value={item.PName}>
                    {item.PName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Member Type
              </label>

              <select
                value={member}
                onChange={(e) => setmember(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </div>
          </div>
         
         <div className=" flex justify-between">
         <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>

          <button
            type="submit" onClick={deleteVoter}
            className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Delete
          </button>
        


         </div>
        </form>

      
       
      </div>
    </div>
  );
};

export default Page;
