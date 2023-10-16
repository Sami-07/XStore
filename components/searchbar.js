"use client"
import React, { useState } from 'react'
import Link from 'next/link'

import { BsArrowUpRightCircleFill } from 'react-icons/bs';
export default function Searchbar({ toggleHamburger }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])
    const fetchSearchData = async (term) => {
        setSearchTerm(term)
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/search?query=${term}`);
        let fetchedResults = await res.json();
        setResults(fetchedResults.products)
        if (term.length == 0) {
            setResults([])
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        window.location.href = `/product/${results[0]["slug"]}`
    }
    return (
        <div>
            <form onSubmit={handleSubmit}  >
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input onClick={e => fetchSearchData(e.target.value)} value={searchTerm} onChange={e => fetchSearchData(e.target.value)} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                    <button type="submit" className="text-white absolute right-2 md:right-44 lg:right-48 xl:right-52 2xl:right-64  bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 my-bg-color"> <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg></button>
                </div>
            </form>
            {results.length > 0 && <div className='bg-white z-0 absolute top-14 w-full flex flex-col gap-2 pt-2 px-3 py-3'>
                {Object.keys(results).map(item => {
                    {
                        return (
                            <Link key={results[item]["slug"]} onClick={() => {
                                setResults([])

                            }} href={`/product/${results[item]["slug"]}`} className='z-40  p-2 px-3  flex justify-between items-center'>
                                <div className='text-s w-full  border-b-2 mr-4' >{(results[item]["title"])} </div>
                                <BsArrowUpRightCircleFill className='text-xl  my-text-color' />
                            </Link>
                        )
                    }
                })}
            </div>
            }
        </div>

    )
}
