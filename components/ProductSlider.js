"use client"
import { useEffect, useState, useRef } from "react";
import { BsArrowBarRight } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import Link from "next/link";
import { AiOutlineLeft } from 'react-icons/ai';
import CustomLoader from "./CustomLoader";
export default function ProductSlider({ category, topHead }) {
    const containerRef = useRef();
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        async function getClothes() {
           
            setIsLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getclothes`, {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            })
            const response = await res.json();
            setProducts(response.allProducts)
            setIsLoading(false)
        }
        getClothes();
    }, [category])
    const scrollLeft = () => {
        const viewportWidth = window.innerWidth;
        if (containerRef.current) {
            containerRef.current.scrollLeft -= (19 / 100) * viewportWidth;
        }
    };
    const scrollRight = () => {
        const viewportWidth = window.innerWidth;
        if (containerRef.current) {
            containerRef.current.scrollLeft += (19 / 100) * viewportWidth;
        }
    };
    return (
        <div>
            {products && <div>
                {products.length === 0 && <CustomLoader />}
                {products.length > 0 &&
                    <div className="mt-10   relative">
                        <h2 className=' text-2xl w-[80vw] mx-auto  text-center mt-10 font-semibold'>
                            {topHead}
                        </h2>
                        <div className=''>
                            <div ref={containerRef} className='grid auto-cols-auto gap-3 grid-flow-col overflow-x-auto snaps-inline py-4   '>
                              
                                <button className='hidden md:block p-1 text-xl  h-10 border-gray-500 border-2 rounded-full md:p-2 z-10 bg-slate-100 absolute top-1/2 left-0  ' onClick={scrollLeft}><AiOutlineLeft /></button>
                                <button className='hidden md:block p-1 text-xl  h-10 border-gray-500 rounded-full border-2 md:p-2 z-10 bg-slate-100 absolute top-1/2 right-0 md:right-4' onClick={scrollRight}><AiOutlineRight /></button>
                                {products.map((product, index) => {
                                    if (index > 5) {
                                        return;
                                    }
                                    if (index === 4) {
                                        return (
                                            <Link key={index} data-aos="fade-up" className="hover:bg-slate-50 px-2 md:mr-20 py-4 md:p-4 w-[25vw] md:w-[4vw] lg:w-[12vw] mx-auto relative shadow-xl border-2 0 rounded-lg snap-start text-sm md:text-xl text-center flex justify-center items-center bg-slate-200" href={`/${category.toLowerCase()}`}>
                                                Show More
                                            </Link>
                                        )
                                    }
                                    if (index <= 4) {
                                        return (
                                            <Link key={product.slug} className=" duration-500 hover:scale-105 hover:border-purple-400 px-2 py-4 md:p-4 w-[40vw] md:w-[25vw] lg:w-[22vw] mx-auto relative shadow-xl border-2  rounded-lg snap-start" href={`/product/${product.slug}`}>
                                                <div >

                                                    <img alt="ecommerce" className="h-[17vh] md:h-[20vh] lg:h-[30vh] p-2 mx-auto" src={product.img} />
                                                    <div className="mt-1 text-center">
                                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                                                        <h2 className="text-gray-900  title-font text-xs md:text-sm font-medium">{product.title.substring(0, 20)}...</h2>
                                                        <p className="mt-1 font-semibold">₹ {product.price}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>}

            </div>}
        </div>
    )
}
