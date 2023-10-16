"use client"
import { useState, useEffect } from 'react'

export default function Footer() {
    const [newYear, setNewYear] = useState()

    const handleClick = () => {
        window.scrollTo(0, 0);
    };
    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        setNewYear(currentYear)
    }, [])
    return (
        <div>
            <footer className="text-gray-600 body-font mt-20">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                        <img src='/images/transparent X logo.png' className='bg-black border-2 w-8 p-1' />
                        <span className="ml-3 text-xl">X Store</span>
                    </a>
                    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© {newYear} X Store —
                        <a href="https://www.linkedin.com/in/shaikh-abdul-sami-879287211/" className="text-gray-600 ml-1" rel="noopener noreferrer"
                            target="_blank">@Shaikh Abdul Sami</a>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a className="ml-3 text-gray-500" href='https://twitter.com/sami73010'>
                            <img src='/images/X com logo.png' className='w-5' />
                        </a>
                        <a className="ml-3 text-gray-500" href='https://www.instagram.com/ig_sami7/'>
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500" href='https://www.linkedin.com/in/shaikh-abdul-sami-879287211/'>
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                            </svg>
                        </a>
                    </span>
                </div>
                <div className='flex justify-start flex-col md:flex-row items-center gap-4 px-5 pb-8'>
                    <a href='/'>Home</a>
                    <a href='/tshirts'>Tshirts</a>
                    <a href='/hoodies'>Hoodies</a>
                    <a href='/ebooks'>E Books</a>
                    <a href='/contact'>Contact</a>
                    <a href='/myaccount'>My Account</a>
                    <a href='/orders'>Orders</a>
                </div>
            </footer>
        </div>
    )
}
