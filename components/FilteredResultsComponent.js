import React from 'react'
import Link from 'next/link'
export default function FilteredResultsComponent({ filteredResults, setFilterClicked }) {
    return (
        <div>
            <div className="container px-5 py-5 mx-auto z-50">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {(filteredResults && filteredResults.length === 0) && <p className='mx-auto'>No Products found for the filters.</p>}
                    {filteredResults.map((item) => {
                        return (
                            <Link key={item.slug} onClick={() => setFilterClicked(false)} className=" p-4 w-full border-slate-200 border mx-auto shadow-lg" href={`/product/${item.slug}`}>
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
                <p className='text-center text-xl mt-10 border-b-4'>End of Results</p>
            </div>
        </div>
    )
}
