import React from 'react'
import Link from 'next/link'
import Product from '../../models/Product';
import connectDB from '../../middleware/mongoose';
import CustomLoader from '../../components/CustomLoader';
export default async function Tshirts() {

  let tshirts = await getTshirts();
  return (
    <div>
      {!tshirts && <CustomLoader />}
      {tshirts &&
        <div><section className="text-gray-600 body-font mt-40 md:mt-28">
      
          <div className="container px-5 py-5 mx-auto">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {Object.keys(tshirts).length === 0 && <p className='mx-auto'>All the tshirts are Out of Stock. New Stock Coming Soon. Stay Tuned!</p>}
              {Object.keys(tshirts).map((tshirt) => {
                return (
                  <Link data-aos="fade-up" key={tshirts[tshirt]._id} className=" p-4 w-full border-slate-200 border mx-auto shadow-lg" href={`/product/${tshirts[tshirt].slug}`}>
                    <div >
                      <img alt="ecommerce" className="h-[20vh] rounded-xl md:h-[50vh] lg:h-[30vh] p-2 mx-auto" src={tshirts[tshirt].img} />
                      <div className="mt-1 text-center">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{tshirts[tshirt].category}</h3>
                        <h2 className="text-gray-900  title-font text-xs md:text-sm font-medium">{tshirts[tshirt].title}</h2>
                        <div className='flex flex-col mt-3 justify-center'>
                          <p className=" flex gap-1 items-center justify-center">
                            {tshirts[tshirt].color.map(eachColor => {
                              return (<span className='h-4 w-4 rounded-full border-black' style={{ backgroundColor: ` ${eachColor}` }}> </span>)
                            })}</p>
                        </div>
                        <p className="mt-1 font-semibold">₹ {tshirts[tshirt].price}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section></div>}
    </div>
  )
}
export async function getTshirts() {
  connectDB()
  let allTshirts = await Product.find({ category: "Tshirts" })
  let tshirts = {}
  for (let item of allTshirts) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color = [...tshirts[item.title].color, item.color]
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size = [...tshirts[item.title].size, item.size]
      }
    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      tshirts[item.title].availableQty = parseInt(tshirts[item.title].availableQty)
      tshirts[item.title].color = [item.color]
      tshirts[item.title].size = [item.size]
    }
  }
  return tshirts
}
