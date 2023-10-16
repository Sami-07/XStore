"use client"
import React, { useEffect, useState, useRef } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import { AiOutlineRight } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';
import { BsArrowBarRight } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import ProductSlider from "../components/ProductSlider"
import Link from 'next/link';
import { redirect } from 'next/navigation';
import CustomLoader from '../components/CustomLoader';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
export default function Home() {
  const session = useSession();
  const [products, setProducts] = useState([])
  const containerRef = useRef(null);
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false
    })
  }, [])
  useEffect(() => {
    if (session.status === "unauthenticated") {
      redirect("/login")
    }
  }, [session])
  const CustomArrowPrev = ({ onClick }) => (
    <button className="custom-arrow prev " onClick={onClick}>
      <AiOutlineLeft className='text-xl p-1 md:text-4xl border-2 md:p-2 rounded-full bg-white' />
    </button>
  );
  const CustomArrowNext = ({ onClick }) => (
    <button className="custom-arrow next  " onClick={onClick}>
      <AiOutlineRight className='text-xl p-1 md:text-4xl border-2 md:p-2 rounded-full bg-white' />
    </button>
  );
  const fetchBestSellingProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fetchbestproducts`);
    const response = await res.json();
    if (response.ok) {
      setProducts(response.products)
    }
  }
  useEffect(() => {
    fetchBestSellingProducts();
  }, [products])

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
    <main className='mt-32 md:mt-20 min-h-screen'>
      {!products.length > 0 && <CustomLoader />}
      <div>
        <Carousel
          renderArrowPrev={(clickHandler, hasPrev, label) =>
            hasPrev && (
              <div className="absolute left-2 md:left-5  top-1/2 z-10 ">
                <CustomArrowPrev onClick={clickHandler} />
              </div>
            )
          }
          renderArrowNext={(clickHandler, hasNext, label) =>
            hasNext && (
              <div className="absolute right-2  md:right-5 top-1/2 z-10">
                <CustomArrowNext onClick={clickHandler} />
              </div>
            )
          }
          autoPlay={true} interval={3000} infiniteLoop={true} stopOnHover={true} showStatus={false} showThumbs={false} swipeable={true} className='mt-0'>
          <img src={`/images/carousel/1.png`} alt="img" className="" />
          <img src={`/images/carousel/2.png`} alt="img" className="" />
          <img src={`/images/carousel/3.png`} alt="img" className="" />
          <img src={`/images/carousel/4.png`} alt="img" className="" />
        </Carousel>
        <div className=''  data-aos="fade-up">
          <ProductSlider category={"ebooks"} topHead={"E Books at X Store"} />
        </div>
          <div  data-aos="fade-up" >
            <div className=' mt-10 border-2 relative'>
              <h1 className='text-2xl pt-5 text-center font-semibold my-font-gradient'>
                Best Sellers
              </h1>
              <div className=''>
                <div ref={containerRef} className='grid auto-cols-auto gap-3 grid-flow-col overflow-x-auto snaps-inline py-4  pt-3'>
                  <BsArrowBarRight className='absolute top-5 right-5 text-xl md:text-3xl md:right-10' />
                  <button className='hidden md:block p-1 text-xl  h-10 border-gray-500 border-2 rounded-full md:p-2 z-10 bg-slate-100 absolute top-1/2 left-0 ' onClick={scrollLeft}><AiOutlineLeft /></button>
                  <button className='hidden md:block p-1 text-xl  h-10 border-gray-500 rounded-full border-2 md:p-2 z-10 bg-slate-100 absolute top-1/2 right-0 md:right-4' onClick={scrollRight}><AiOutlineRight /></button>
                  {products && products.map(product => {
                    return (
                      <Link key={product.slug} className="px-2 py-4 md:p-4 w-[40vw] md:w-[25vw] lg:w-[22vw] mx-auto relative shadow-xl border-2 duration-500 hover:scale-105 hover:border-purple-400 rounded-lg snap-start" href={`/product/${product.slug}`}>
                        <div >
                          <img src='/images/top seller.png' className='w-10 md:w-14 absolute top-2' />
                          <img alt="ecommerce" className="h-[17vh] md:h-[20vh] lg:h-[30vh] p-2 mx-auto" src={product.img} />
                          <div className="mt-1 text-center">
                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                            <h2 className="text-gray-900  title-font text-xs md:text-sm font-medium">{product.title.substring(0, 20)}...</h2>
                            <p className="mt-1 font-semibold">₹ {product.price}</p>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className=''  data-aos="fade-up">
              <ProductSlider category={"Tshirts"} topHead={"Designer Tshirts at Xstore"} />
            </div>
            <div  data-aos="fade-up">
              <ProductSlider category={"Hoodies"} topHead={"Trending Designer Hoodies"} />
            </div>
          </div>
      </div>
    </main>
  );
}
