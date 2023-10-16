import React from 'react'
import Link from 'next/link'
import Product from '../../models/Product';
import { getServerSession } from "next-auth"
import connectDB from '../../middleware/mongoose';
import {redirect} from "next/navigation";
export default async function Hoodies() {
  const session = await getServerSession();
  let hoodies = await getHoodies();
  return (
    <div><section className="text-gray-600 body-font mt-40 md:mt-28">
      
      <div className="container px-5 py-5 mx-auto">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {Object.keys(hoodies).length === 0 && <p className='mx-auto'>All the Hoodies are Out of Stock. New Stock Coming Soon. Stay Tuned!</p>}
          {Object.keys(hoodies).map((hoodie) => {
            return (
              <Link data-aos="fade-up" key={hoodies[hoodie]._id} className="p-4 w-full border-slate-200 border mx-auto shadow-lg" href={`/product/${hoodies[hoodie].slug}`}>
                <div >
                  <img alt="ecommerce" className="h-[20vh] md:h-[50vh] rounded-xl lg:h-[30vh] p-2 mx-auto" src={hoodies[hoodie].img} />
                  <div className="mt-1 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{hoodies[hoodie].category}</h3>
                    <h2 className="text-gray-900  title-font text-xs md:text-sm font-medium">{hoodies[hoodie].title}</h2>
                    <div className='flex flex-col mt-3 justify-center'>
                  
                      <p className=" flex gap-1 items-center justify-center">
                        {hoodies[hoodie].color.map(eachColor => {

                          return (<span key={eachColor} className='h-4 w-4 rounded-full border-black' style={{ backgroundColor: ` ${eachColor}` }}> </span>)
                        })}</p>
                    </div>

                    <p className="mt-1 font-semibold">₹ {hoodies[hoodie].price}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section></div>
  )
}
async function getHoodies() {
  connectDB()
  let allhoodies = await Product.find({ category: "Hoodies" })
  let hoodies = {}
  for (let item of allhoodies) {
    if (item.title in hoodies) {
      if (!hoodies[item.title].color.includes(item.color) && item.availableQty > 0) {
        hoodies[item.title].color = [...hoodies[item.title].color, item.color]
      }
      if (!hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
        hoodies[item.title].size = [...hoodies[item.title].size, item.size]
      }
    }
    else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item))
      hoodies[item.title].availableQty = parseInt(hoodies[item.title].availableQty)
      hoodies[item.title].color = [item.color]
      hoodies[item.title].size = [item.size]
    }
  }
  return hoodies
}
