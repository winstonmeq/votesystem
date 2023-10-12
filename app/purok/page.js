'use client'
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";



const Page = () => {

  const [datalist, setdatalist] = useState([]);    
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  const router = useRouter();


  useEffect(() => {
        
    const fetchDataAndCheckAdmin = async () => {
      try {
        if (!session || !session.user.isAdmin) {
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
    
    }, [session,router]);
  



  useEffect(() => {   

              async function FetchData() {
                try {
                const { data } = await axios.get(process.env.LOCAL_URL + `/api/purok`)
                setdatalist(data);


              } catch (error) {

                console.error(error);
           

              } finally {
                setLoading(false)
              }
                    
            }
 
    FetchData();

    }, []);




 
    const columns = [
      {
        name: "Purok Name",
        selector: (row) => (
          <div className="justify-center text-sm">{row.PName}</div>
        ),
         
      },
  
      {
        name: "Coordinator",
        selector: (row) => (
          <div className="justify-center text-sm">{row.Coordinator}</div>
        ),
      },
  
      {
        name: "Mobile",
        selector: (row) => row.Phone,
      },
      {
        name: "Total Voters",
        selector: (row) => row.totalVote,
      },
  
        
  
      {
        name: "Action",
        selector: (row) => (
          <div className="w-full  transform hover:text-purple-500 ">
          <div className="flex flex-col gap-2 m-2">
            <div className="flex flex-row">
            <Link className="black_btn" href={`/purok/${row._id}`}>Edit</Link>
            </div>
          </div>        
           
  
          </div>
          
        ),
      },
    ];
  




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


  return (
    <div className="flex-row w-full">



<div className="flex flex-col sm:flex-row w-full justify-between m-2">

  <Link href="/purok/add" className="black_btn">Add Purok</Link>
  


</div>

<div className="w-full">

<DataTable
            columns={columns}
            data={datalist}
            title="Purok Lists"
            defaultSortFieldId="createdAt"
            pagination
            paginationPerpage={datalist.length}
          />
</div>

        
      
    </div>
    
  )
}

export default Page