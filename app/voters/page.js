"use client";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from "next/navigation";




const Page = () => {


  const [datalist, setdatalist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  

 



  useEffect(() => {
        
    const fetchDataAndCheckAdmin = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user || !session.user.isAdmin) {
          router.push('/');
        } else {
          console.log('successfully logged in');
          fetchData(); // Fetch data after admin check
        }
      } catch (error) {
        console.error('Error checking admin privileges:', error);
      }  
    };

    fetchDataAndCheckAdmin();
    }, [router]);
  


    const fetchData = async () => {
      try {
        const { data } = await axios.get(process.env.LOCAL_URL + '/api/voter');
        setdatalist(data);
      } catch (error) {
        console.error('Error fetching voters data:', error);
      } finally {
        setLoading(false);
      }
    };


//   useEffect(() => {
        
//     const checkAdminPrivileges = async () => {

//       const session = await getSession();
  
//       if (!session || !session.user || !session.user.isAdmin) {
//         router.push('/');
//       } else {
//         console.log('successfully logged in');
//       }
//     };
  
//     checkAdminPrivileges();
//   }, [router]);



// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get(process.env.LOCAL_URL + `/api/voter`);
            
//         setdatalist(data);
//       } catch (error) {
//         console.error(error);
//       } finally {

//         setLoading(false)

//       }
//     };
  
//     fetchData();
//   }, []);



  if (loading) {
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="mt-4">Loading...</p>
      </div>
      </div>
    );
  }




  // useEffect(() => {

  //  async function FetchData() {
  //     try {
  //       const { data } = await axios.get(process.env.LOCAL_URL + `/api/voter`);
  //       setdatalist(data);
  //       setLoading(false);
  //       console.log('voters', data)
  //     } catch (error) {
  //       console.error(error);
  //       setLoading(false);
  //     }
  //   }

  //   FetchData();

  // }, []);


  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/"); // Redirect to homepage if user is not logged in
  //   }
  // }, [status, router]);





  const columns = [
    {
      name: "Name",
      selector: (row) =>
        row.member ? (
          <div className="text-red-900 font-bold">
            {row.fname} {row.lname}
          </div>
        ) : (
          <div>
            {row.fname} {row.lname}
          </div>
        ),
    },

    {
      name: "Age",
      selector: (row) => (
        <div className="justify-center text-sm">{row.age}</div>
      ),
    },

    // {
    //   name: "Position",
    //   selector: (row) => row.position,
    // },
    // {
    //   name: "Precinct",
    //   selector: (row) => row.prec_num,
    // },

    {
      name: (
        <div className=" text-white text-sm bg-slate-500 p-2 rounded-lg font-bold">
          Purok
        </div>
      ),
      selector: (row) => row.purok,
    },

    {
      name: "Action",
      selector: (row) => (
        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
          <Link href={`/voters/${row._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </Link>
          
        </div>
        
      ),
    },
  ];

  return (
    <div className="flex-row w-full">



<div className="flex flex-col sm:flex-row w-full justify-between m-2">

  <Link href="/voters/add" className="black_btn">Add Voter</Link>
  
  {/* <div className="flex flex-row">
    <input
      type="text"
      className="border rounded-lg bg-gray-100 pl-2"
      placeholder="Search..."
    />
    <button className="black_btn">
      Search
    </button>
  </div> */}

 

</div>

<div className="w-full">

<DataTable
            columns={columns}
            data={datalist}
            title="Voter Lists"
            defaultSortFieldId="createdAt"
            pagination
            paginationPerpage={datalist.length}
          />
</div>

        
      
    </div>
  );
};

export default Page;
