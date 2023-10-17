"use client"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MyOrder() {
  const searchParams = useSearchParams()
  const [allProducts, setAllProducts] = useState([])
  const [total, setTotal] = useState("")
  const orderId = searchParams.get("orderid")
  const [openPopUp, setOpenPopUp] = useState(false);
  const router = useRouter();
  const [deliveryStatus, setDeliveryStatus] = useState("");
  useEffect(() => {
    async function orderDataFetch() {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fetchorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderId)
      })
      const FetchedOrder = await res.json();
      setDeliveryStatus(FetchedOrder["order"]["deliveryStatus"]);

      setAllProducts(FetchedOrder["order"]["products"])
      setTotal(FetchedOrder["order"]["amount"])
    }
    orderDataFetch()
  }, [])
  async function cancelOrder() {
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cancelorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId })
    })
    let response = await res.json();

    if (response.ok) {
      toast.success("Order Cancelled", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/orders");
      }, 2000)
    }
    else {
      toast.error("Couldn't Cancel Order", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  async function redirectToDownloadBook(slug) {
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fetchbook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ slug })
    })
    const response = await res.json();
    if (response.bookDetails) {
      const downloadUrl = response.bookDetails["filePath"];
      window.location.href = downloadUrl;
    }
  }
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {allProducts && <section data-aos="fade-up" className="text-gray-600 body-font overflow-hidden md:mt-14 min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className=" px-5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest text-center" data-aos="fade-up">X Store</h2>
              {(deliveryStatus !== "Cancelled") && <h1 className="text-gray-800 text-xl text-center title-font font-semibold mb-4" data-aos="fade-up">Your Order has been placed Successfully!</h1>}
              {(deliveryStatus === "Cancelled") && <h1 className="text-gray-800 text-xl text-center title-font font-semibold mb-4" data-aos="fade-up">Your Order has been  Cancelled</h1>}
              <img alt="ecommerce" className="lg:w-1/2 block md:hidden w-full mb-5 lg:h-auto h-64 object-cover object-center rounded" src="/images/thanksforordering.png" />
              <div className="flex " data-aos="fade-up">
                <a className="w-[70vw] text text-xs font-semibold">Item Name</a>
                <a className="text-right w-[15vw] text-xs font-semibold">Quantity</a>
                <a className="text-right w-[15vw] text-xs font-semibold" >Price</a>
              </div>
              {allProducts && Object.keys(allProducts).map((itemSlug) => {
                return (
                  <div key={itemSlug} className="flex justify-between mt-2 mb-2">
                    <div className="text-gray-500 w-[50vw] text-xs md:text-sm flex justify-start gap-4">
                      <img src={allProducts[itemSlug]["img"]} className='w-10 rounded-md' />
                      <div >

                        <p className="w-40">{allProducts[itemSlug]["name"].substring(0, 40)}...</p>
                        {allProducts[itemSlug]["category"] === "ebooks" && <button onClick={() => redirectToDownloadBook(itemSlug)} className="flex  text-white justify-center items-center bg-indigo-500 border-0 px-4 h-8 focus:outline-none hover:bg-indigo-600 rounded text-xs">Download</button>
                        }                      </div>
                    </div>

                    <span className=" text-gray-900 text-right w-[15vw]">{allProducts[itemSlug]["qty"]}</span>
                    <span className=" text-gray-900 text-right w-[15vw]">₹{allProducts[itemSlug]["price"]}</span>
                  </div>
                )
              })}
              <div className=" mt-5 flex gap-20">
                <div className="flex flex-col">
                  <p className="text-xl" data-aos="fade-up">
                    Net Total
                  </p>
                  <span className="text-sm" data-aos="fade-up"> (Post Discount, if any and Delivery Charges, if any)</span>
                </div>
                {allProducts && <p data-aos="fade-up" className="title-font font-medium text-2xl text-gray-900">₹{total}</p>}
              </div>
            </div>
            <img data-aos="fade-up" alt="ecommerce" className="lg:w-1/2 hidden md:block w-full lg:h-auto h-64 object-cover object-center rounded" src="/images/thanksforordering.png" />
          </div>

          {(deliveryStatus !== "Cancelled") && <div>
            {!openPopUp && <div> <button onClick={() => {
              setOpenPopUp(!openPopUp)
            }} className="flex ml-3 border-purple-600 text-black py-2 px-4 focus:outline-none hover:bg-purple-500 hover:text-white transition ease-in-out border-2 rounded justify-center  md:w-1/3">Cancel Order</button> </div>
            }
            {openPopUp && <div className="flex flex-col  justify-center items-start gap-4">   <p>Please Confirm your order Cancellation</p>
              <button data-aos="fade-up" onClick={cancelOrder} className="flex ml-3 border-purple-600 text-black py-2 px-4 focus:outline-none hover:bg-purple-500 hover:text-white transition ease-in-out border-2 rounded justify-center md:w-1/3">Confirm</button>
              <button data-aos="fade-up" onClick={() => {
                setOpenPopUp(!openPopUp)
              }} className="flex ml-3 border-purple-600 text-white py-2 px-4 focus:outline-none my-bg-color hover:text-white transition ease-in-out border-2 rounded justify-center md:w-1/3">Go Back</button> </div>}
          </div>
          }

        </div>
      </section>}
    </div>
  )
}
