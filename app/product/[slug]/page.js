"use client"
import { useEffect, useState } from 'react'
import { useCartContext } from '../../../components/SubLayout'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import ProductSlider from "../../../components/ProductSlider"
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../../components/CustomLoader';
export default function Slug({ params }) {
  const session = useSession();

  const slug = params.slug
  const router = useRouter()
  const { addtoCart, buyNow, notifySuccess, notifyFailure } = useCartContext();
  const [pin, setPin] = useState("")
  const [service, setService] = useState()
  const [colorSizeSlug, setColorSizeSlug] = useState({})
  const [singleProduct, setSingleProduct] = useState({})
  const [allColors, setAllColors] = useState()
  const [allSizes, setAllSizes] = useState()
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [category, setCategory] = useState("");
  async function checkServicability() {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let JSONpins = await pins.json()
    if (Object.keys(JSONpins).includes(pin)) {
      setService(true)
      notifySuccess("Your Pincode is Serviceble!", "bottom-center")
    }
    else {
      setService(false)
      notifyFailure("Sorry, Pincode is not Serviceble.", "bottom-center")
    }
  }
  useEffect(() => {
    async function fetching() {
      let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fetchproductsvariants?query=${slug}`)
      if (data.status == 404) {
        // window.location.href = "/productnotfound"
        router.push("/productnotfound")
      }
      else{
        let parsedData = await data.json()
        setColorSizeSlug(parsedData.colorSizeSlug)
        setSingleProduct(parsedData.singleProduct)
  
        setAllSizes(singleProduct.size)
        setAllColors(singleProduct.color)
        setCategory(singleProduct.category)
      }
    
    }
    fetching();
  }, [selectedColor, selectedSize,singleProduct,  router])
  function redirectUrl(selectedSize, selectedColor) {
    let newUrl = `${process.env.NEXT_PUBLIC_HOST}/product/${colorSizeSlug[selectedColor][selectedSize]["slug"]}`
   window.location.href = newUrl;
  }
  return (
    <div>

      {!singleProduct && <CustomLoader />}

      <section className="text-gray-600 body-font overflow-hidden mt-40 md:mt-24 min-h-screen">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {singleProduct.title &&
          <div className="container px-5 md:py-5 mx-auto " >
            <div className="lg:w-4/5 flex flex-col md:flex-row justify-center mx-auto ">
              {singleProduct.img && <div className='mx-auto md:mx-0 ' > <img alt="ecommerce" className=" border-2   border-gray-100  md:mt-10 
             rounded" src={singleProduct.img} /> </div>}
              <div className=" lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm ml-4 md:ml-0 title-font text-gray-500 tracking-widest" data-aos="fade-up">X Store</h2>
                <h1 className="text-gray-900 text-lg title-font font-medium mb-1 ml-4 md:ml-0" data-aos="fade-up">{singleProduct.title} {singleProduct.size}  {singleProduct.color}</h1>
                {(singleProduct.category === "Tshirts" || singleProduct.category === "Hoodies") &&
                  <div>
                    <p data-aos="fade-up" className='mt-4'>Please select a color</p>
                    <div className="flex mt-2 items-center pb-5 gap-5 border-b-2 border-gray-100 mb-5">
                      <div className="flex">
                        <span className="mr-3" data-aos="fade-up">Color</span>
                        <div data-aos="fade-up">
                          {Object.keys(colorSizeSlug).map((each) => {
                            return (
                              <button onClick={(e) => setSelectedColor(e.target.value)} key={each} style={{ backgroundColor: ` ${each}` }} className="border-2 border-black ml-1 rounded-full w-6 h-6 focus:outline-none" value={each}></button>
                            )
                          })}
                        </div>
                      </div>
                      <div className="flex ml-6 items-center">
                        <span className="mr-3">Size</span>
                        <div className="relative">
                          {colorSizeSlug[selectedColor] && singleProduct && <select
                            onChange={(e) => {
                              setSelectedSize(e.target.value)
                              redirectUrl(e.target.value, selectedColor)
                            }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                            <option>Select</option>
                            {Object.keys(colorSizeSlug[selectedColor]).map((size) => (
                              <option value={size} key={size}>{size}</option>
                            ))}
                          </select>}
                          <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>}

                {(Number(singleProduct.availableQty) > 0) &&
                  <div data-aos="fade-up">
                    <span className="title-font font-medium text-2xl ml-4 md:ml-0 text-gray-900">₹{singleProduct.price}</span>
                    <div className="flex flex-col items-center gap-4 md:w-1/2 mt-5 ">
                      <button data-aos="fade-up" onClick={() => {
                        buyNow(slug, 1, singleProduct.price, singleProduct.title, singleProduct.size, singleProduct.color, singleProduct.img, singleProduct.category)
                        window.location.href = "/checkout"
                      }} className="flex ml-3 text-white my-bg-color border-0 py-2 px-4 md:px-6 focus:outline-none hover:bg-indigo-600 rounded w-full justify-center">Buy Now</button>
                      <button data-aos="fade-up" onClick={() => {
                        addtoCart(slug, 1, singleProduct.price, singleProduct.title, singleProduct.size, singleProduct.color, singleProduct.img, singleProduct.category)
                      }
                      } className="flex justify-center w-full ml-2 text-white my-bg-color border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
                    </div>
                  </div>}
                {(Number(singleProduct.availableQty) === 0) && <p className='text-red-500 font-medium' data-aos="fade-up">This Variant is currently Out of Stock.</p>
                }
                <div data-aos="fade-up" className='flex mt-10 gap-5 mb-2 items-center justify-center md:justify-start'>
                  <input placeholder='500065' type='text' className='w-1/2 h-10 rounded border-2 px-2 border-indigo-500' onChange={e => setPin(e.target.value)} value={pin}></input>
                  <button onClick={checkServicability} className="flex  border-purple-600 text-black  border-2 py-1 font-medium px-6 focus:outline-none text-md hover:bg-indigo-600 rounded">Check</button>
                </div>
                {service && service != null && <p className='text-green-600 ml-2 text-center md:text-left'>we serve this pincode</p>}
                {!service && service != null && <p className='text-red-600 ml-2 text-center md:text-left '>Sorry, we do not yet serve this pincode</p>}
              </div>
            </div>
            <div className=' md:grid justify-center grid-cols-2 gap-10 md:px-10'>
              <div>

                <p className='text-xl font-semibold mt-10 mb-2' data-aos="fade-up">Product Features</p>
                <div className='grid grid-cols-2 ga  '>
                  <h3 className='font-semibold' data-aos="fade-up">Product Name : </h3>
                  <p data-aos="fade-up">  {singleProduct.title} </p>
                </div>
                {singleProduct.category === "ebooks" &&
                  <div>

                    <div data-aos="fade-up" className='grid grid-cols-2'>
                      <h3 data-aos="fade-up" className='font-semibold'>Author : </h3>
                      <p data-aos="fade-up"> {singleProduct.author}  </p>
                    </div>
                    <div data-aos="fade-up" className='grid grid-cols-2'>
                      <h3 data-aos="fade-up" className='font-semibold'>No. of Pages : </h3>
                      <p data-aos="fade-up"> {singleProduct.pages}  </p>
                    </div>
                    <div data-aos="fade-up" className='grid grid-cols-2'>
                      <h3 data-aos="fade-up" className='font-semibold'> File Name : </h3>
                      <p data-aos="fade-up"> {singleProduct.fileName}  </p>
                    </div>
                  </div>
                }
                {(singleProduct.category === "Tshirts" || singleProduct.category === "Hoodies") &&
                  <div>
                    <div className='grid grid-cols-2' data-aos="fade-up">
                      <h3 className='font-semibold' data-aos="fade-up">Product Size : </h3>
                      <p data-aos="fade-up"> {singleProduct.size}  </p>
                    </div>
                    <div className='grid grid-cols-2' data-aos="fade-up">
                      <h3 className='font-semibold'>Product Color : </h3>
                      <p> {singleProduct.color}  </p>
                    </div>
                  </div>}
              </div>
              <div data-aos="fade-up">
                <p className='text-xl font-semibold mt-10 mb-2'>Product Description</p>
                <p className="leading-relaxed">{singleProduct.desc}</p>
              </div>

            </div>
          </div>}
      </section>
      <div data-aos="fade-up">
        <ProductSlider category={singleProduct.category} topHead={"Explore Similar Products"} />
      </div>
    </div>
  )
}


