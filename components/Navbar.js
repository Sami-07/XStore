"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { useRef } from 'react'
import { AiOutlineUser } from "react-icons/ai"
import { AiOutlineHome } from "react-icons/ai"
import { HiOutlineShoppingBag } from "react-icons/hi"
import { PiBooksLight } from "react-icons/pi"
import { LiaTshirtSolid } from "react-icons/lia"
import { PiHoodieLight } from "react-icons/pi"
import { TbHelpSquareRounded } from "react-icons/tb"
import { useMemo } from 'react'
import { FiLogOut } from "react-icons/fi"
import { RxHamburgerMenu } from "react-icons/rx"
import { FiLogIn } from "react-icons/fi"
import { useCartContext } from '../components/SubLayout'
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const session = useSession();
    const { setFilterClicked } = useCartContext();
    const [name, setName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [loggedInWithGoogle, setLoggedInWithGoogle] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        if (session.status === "unauthenticated") {
            redirect("/login")
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        async function fetchUserName() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserFromSession`);
            const response = await res.json();
            setName(response.name);
            if (response.imgUrl) {
                setLoggedInWithGoogle(true);
                setImgUrl(response.imgUrl);
            }

        }
        fetchUserName();
    }, [session]);

    const ref = useRef()
    function toggleHamburger() {
        setFilterClicked(false)
        ref.current.classList.remove("translate-x-0")
        ref.current.classList.add("-translate-x-full")
    }
    function openNavbar() {
        ref.current.classList.remove("-translate-x-full")
        ref.current.classList.add("translate-x-0")
    }
    return (
        <div>
            <div className=' open-font '>
                {session ? <nav ref={ref} className=' flex w-[60vw] md:w-[28vw] lg:w-[22vw] h-screen top-0 fixed  transform transition-transform translate-x-0 z-50' style={{ backgroundColor: "#793FDF" }}>
                    <Link href={"/"}> <Image src="/images/transparent X logo.png" className='absolute w-8 md:w-10 md:h-10 p-2 left-6 top-6 md:top-4 rounded bg-black' width={100} height={100} alt='X Logo' /></Link>
                    <Link href={"/myaccount"} className='cursor-pointer absolute left-5 top-24 flex justify-center items-center gap-4'>
                        {loggedInWithGoogle && <img src={imgUrl} className='w-10 rounded-sm h-10' />}
                        {!loggedInWithGoogle && <AiOutlineUser className='text-white border-white border-2 rounded-full text-3xl p-1' />}
                        <p className=' text-white  text-md font-bold'>
                            {name}</p>
                        {!name && <p className=' text-white  text-md font-bold'>
                            Hello User</p>}
                    </Link>
                    <RxHamburgerMenu onClick={toggleHamburger} className='text-white absolute text-2xl right-4 top-7 cursor-pointer' />
                    <div className='absolute md:w-[20vw] left-3 md:left-[1vw]  top-1 w-full'>
                    </div>
                    <div className='flex flex-col gap-3 text-white text-lg absolute top-36  left-8'>
                        <Link href="/" onClick={toggleHamburger} className={pathname === "/" ? "bg-blue-500  rounded-md p-2 flex items-center  gap-4" : "flex items-center  gap-4"}> <AiOutlineHome />Home</Link>
                        <p className='opacity-75 text-base'>Shop</p>
                        <Link href="/tshirts" onClick={toggleHamburger} className={pathname === "/tshirts" ? "bg-blue-500  rounded-md p-2 flex items-center  gap-4" : "flex items-center  gap-4"}> <LiaTshirtSolid />Tshirts</Link>
                        <Link href="/hoodies" onClick={toggleHamburger} className={pathname === "/hoodies" ? "bg-blue-500  rounded-md p-2 flex items-center  gap-4" : "flex items-center  gap-4"}> <PiHoodieLight />Hoodies</Link>
                        <Link href="/ebooks" onClick={toggleHamburger} className={pathname === "/ebooks" ? "bg-blue-500  rounded-md p-2 flex items-center  gap-4" : "flex items-center  gap-4"}> <PiBooksLight />E Books</Link>
                        <p className='opacity-75 text-base'>Account</p>
                        <Link href="/myaccount" onClick={toggleHamburger} className={pathname === "/myaccount" ? "bg-blue-500  rounded-md p-2 flex items-center  gap-4" : "flex items-center  gap-4"}> <AiOutlineUser />My Account</Link>
                        <Link href="/orders" onClick={toggleHamburger} className={pathname === "/orders" ? "bg-blue-500  rounded-md p-2 flex items-center  gap-4" : "flex items-center  gap-4"}> <HiOutlineShoppingBag />My Orders</Link>
                        <Link href="/contact" onClick={toggleHamburger} className={pathname === "/contact" ? "bg-blue-500  rounded-md p-2 flex items-center  gap-4" : "flex items-center  gap-4"}> <TbHelpSquareRounded />Contact</Link>
                        {session.status === "authenticated" && <div onClick={() => {
                            signOut()
                            router.push("/login")
                        }} className="flex items-center  gap-4"> <FiLogOut className='rotate-180' />Logout</div>}
                        {session.status === "unauthenticated" && <Link href="/login" onClick={toggleHamburger} className="flex items-center  gap-4"> <FiLogIn />Login</Link>}
                    </div>
                </nav> : ""}
                <div className='mb-20 md:mb-0 z-40'>
                    <div className='flex justify-center md:hidden'>
                        <Link href={"/"}>     <Image src="/images/transparent X logo.png" className='fixed top-3  z-40 mx-auto flex items-center  gap-6 w-7 h-7 p-2  rounded bg-black' width={100} height={100} alt='X logo' /> </Link>
                    </div>
                    <nav className=' md:hidden my-bg-color z-30 fixed top-0 w-screen h-12  flex justify-between items-center px-4 '>
                        <RxHamburgerMenu onClick={openNavbar} className='text-white  cursor-pointer' />
                    </nav>
                </div>
                <nav className='hidden md:flex w-[20vw] md:w-[10vw] lg:w-[8vw] h-screen fixed top-0 transform transition-transform translate-x-0' style={{ backgroundColor: "#793FDF" }}>
                    <div className='flex flex-col gap-5 text-white text-lg absolute top-8  left-8 2xl:left-14'>
                        <Link href={"/"}>
                            <Image src="/images/transparent X logo.png" className='flex items-center  gap-6 w-7 h-7 p-2  rounded bg-black' width={100} height={100} alt='X logo' />
                        </Link>
                        <RxHamburgerMenu onClick={openNavbar} className='text-white  text-2xl flex items-center  gap-6 cursor-pointer' />
                        <Link
                            href="/"
                            onClick={toggleHamburger}
                            className={pathname === "/" ? "bg-blue-500   p-1 rounded-md flex items-center gap-6 " : "flex items-center gap-6"}
                        >
                            <AiOutlineHome className="text-2xl" />
                        </Link>

                        <Link href="/tshirts" onClick={toggleHamburger} className={pathname === "/tshirts" ? "bg-blue-500   p-1 rounded-md flex items-center gap-6 " : "flex items-center gap-6"}> <LiaTshirtSolid className='text-2xl' /></Link>
                        <Link href="/hoodies" onClick={toggleHamburger} className={pathname === "/hoodies" ? "bg-blue-500   p-1 rounded-md flex items-center gap-6 " : "flex items-center gap-6"}> <PiHoodieLight className='text-2xl' /></Link>
                        <Link href="/ebooks" onClick={toggleHamburger} className={pathname === "/ebooks" ? "bg-blue-500   p-1 rounded-md flex items-center gap-6 " : "flex items-center gap-6"}> <PiBooksLight className='text-2xl' /></Link>

                        <p className='opacity-75 text-base'></p>
                        <Link href="/myaccount" onClick={toggleHamburger} className={pathname === "/myaccount" ? "bg-blue-500   p-1 rounded-md flex items-center gap-6 " : "flex items-center gap-6"}> <AiOutlineUser className='text-2xl' /></Link>
                        <Link href="/orders" onClick={toggleHamburger} className={pathname === "/orders" ? "bg-blue-500   p-1 rounded-md flex items-center gap-6 " : "flex items-center gap-6"}> <HiOutlineShoppingBag className='text-2xl' /></Link>
                        <Link href="/contact" onClick={toggleHamburger} className={pathname === "/contact" ? "bg-blue-500   p-1 rounded-md flex items-center gap-6 " : "flex items-center gap-6"}> <TbHelpSquareRounded className='text-2xl' /></Link>
                        {session.status === "authenticated" && <div onClick={() => {
                            signOut()
                            router.push("/login")
                        }
                        } className='flex items-center  gap-6'> <FiLogOut className='rotate-180 text-2xl' /></div>}
                        {session.status === "unauthenticated" && <Link href="/login" onClick={toggleHamburger} className='flex items-center  gap-6'> <FiLogIn /> </Link>}
                    </div>
                </nav>
            </div>

        </div>
    )
}


