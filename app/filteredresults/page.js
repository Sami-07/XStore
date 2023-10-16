"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
import CustomLoader from '../../components/CustomLoader';
export default function page() {
    return (
        <div>
            <div className="container px-5 py-5 mx-auto z-50 mt-32 min-h-screen">
                {parsedFilteredProducts && <p className='text-base italic underline mb-5 underline-offset-4'>Seach Results based on your filters.</p>}
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {!parsedFilteredProducts && <CustomLoader />}
                    {(parsedFilteredProducts && parsedFilteredProducts.length === 0) && <p className='mx-auto'>No Products found for the filters.</p>}

                    {parsedFilteredProducts &&

                        parsedFilteredProducts.map((item) => {
                            return (
                                <Link key={item.slug} className=" p-4 w-full border-slate-200 border-2 mx-auto shadow-lg" href={`/product/${item.slug}`}>
                                    <div >
                                        <img alt="ecommerce" className="h-[20vh] md:h-[50vh] lg:h-[30vh] p-2 mx-auto" src={item.img} />
                                        <div className="mt-1 text-center">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category.toUpperCase()}</h3>
                                            <h2 className="text-gray-900  title-font text-xs md:text-sm font-medium">{item.title}</h2>

                                            <p className="mt-1">₹ {item.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                </div>


            </div></div>
    )
}
