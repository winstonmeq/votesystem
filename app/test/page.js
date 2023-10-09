


import React from 'react'


const page = async () => {

 const res = await fetch(process.env.LOCAL_URL + '/api/voter');
 const data = await res.json()





  return (
    <div className='grid grid-cols-6 gap-x-6 gap-y-3'>
    <div className='col-span-full space-v-3 lg:col-span-4'>
    {
            data.map((item,i) => (
                <>
                    {item.fname}
                </>
            ))
        
        }
    </div>
   

      
    <div>sample test</div>
    
    </div>
  )
}

export default page