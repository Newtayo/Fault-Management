import React from 'react'

const Pagenotfound = () => {
  return (
    <div className='w-full flex flex-col'>
    <div className='w-full flex justify-start flex-col'>
        <h1 className='text-3xl  text-black'>Brillscomer </h1>
        <hr className='border-t-4 border-black w-full'/>
    </div>
    <div className='w-3/4  flex flex-col mx-auto items-center justify-center'>
      <img src='https://m.media-amazon.com/images/I/618iVz7RxwL._AC_UF894,1000_QL80_.jpg' alt='error' className='sm:w-2/4'/>
      <h1 className='text-3xl font-bold'>Page Not Found</h1>
      
    </div>
    </div>
  )
}

export default Pagenotfound