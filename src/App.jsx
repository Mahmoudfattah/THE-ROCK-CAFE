import React from 'react'
import ProdectDetails from './prodectDetails'
import ItemsRelated from './ItemsRelated'

export default function App() {
  return (
    <>
    
    <ProdectDetails/>


 <div className='p-6  lg:p-16 '>
     <h3 className=' border-t border-[#D6D1C7]   text-2xl font-serif text-[#2C2A26] mt-8   '>
     You Might Also Like 
     </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8  mt-8">
    <ItemsRelated/>
    </div>
 </div>
    </>
  )
}
