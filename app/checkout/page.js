"use client"
import { useEffect, useState } from 'react'
import { useCartContext } from '../../components/SubLayout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuid } from 'uuid';
import { useSession } from "next-auth/react"

import { AiOutlineInfoCircle } from "react-icons/ai"
import { PropagateLoader } from "react-spinners"
import CustomLoader from '../../components/CustomLoader';
export default function Checkout() {
  const session = useSession();

  const { cart, subTotal, amountToBePaid, clearCart } = useCartContext();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const [stock, setStock] = useState([]);
  const [initiated, setInitiated] = useState(false);
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    async function fetchProductInfo() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getproductinfo`, {
        method: "POST",
        headers: {
          "Content-Type": "appliation/json"
        },
        body: await JSON.stringify(cart)
      })
      const response = await res.json();
      setStock(response.stockQty)
    }
    fetchProductInfo();
  }, [cart])
  useEffect(() => {
    async function getUserEmail() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserFromSession`)
      const response = await res.json();
      const userEmail = response.email;
      setEmail(userEmail)
      getUserDetails(userEmail)
    }
    async function getUserDetails(paramEmail) {
      const data = { paramEmail }
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuserdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      let response = await res.json()
      setName(response.name);

      if (response.phone && response.address && response.pincode) {
        setAddress(response.address)
        setPhone(response.phone)
        setPincode(response.pincode)
      }
    }
    getUserEmail()
    setCityState()
  }, [pincode])
  async function setCityState() {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, { cache: 'no-store' })
    let JSONpins = await pins.json()
    if (Object.keys(JSONpins).includes(pincode)) {
      setCity(JSONpins[pincode][0])
      setState(JSONpins[pincode][1])
    }
    else {
      setCity("")
      setState("")
    }
  }
  async function handlePay(e) {
    e.preventDefault()
    const unique_id = uuid();
    const orderId = unique_id.slice(0, 8)
    const data = { name, email, phone, address, cart, subTotal, amountToBePaid, orderId, pincode, state, city }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    )
    let response = await res.json()

    if (response.msg == "order initiated") {
      const info = { name, email, address, city, state, pincode, phone, amountToBePaid, cart, orderId }

      let res = await await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(info)
        }
      )

      let response = await res.json();

      if (response.success) {

        const options = {
          "key": response.key_id,
          "amount": response.amount,
          "currency": "INR",
          "image": "/transparent X logo.png",
          "order_id": response.razorpayOrderId,
          "key_id": response.key_id,
          "handler": async function () {
            clearCart()
            setProcessing(true)
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/ordermail`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(info)
            })
            let res2 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/reduceqty`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              }, body: JSON.stringify({ orderId })
            })
            let respo2 = await res2.json();
          
            if (respo2.success) {
              setProcessing(false)
              window.location.href = `${process.env.NEXT_PUBLIC_HOST}/order?orderid=${orderId}`
            }
            else {
              toast.error("error", {
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
          },

          "theme": {
            "color": "#2300a3"
          }
        }
        const razorpayObject = new window.Razorpay(options)

        razorpayObject.open();
      }
    }
    else {
      toast.error(response.msg, {
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
  return (
    <div className='mx-auto mt-10 md:flex justify-center gap-6 px-4'>
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


      <form className='md:w-1/2  md:px-0 mx-auto mt-40 md:mt-24'>
        <h1 className='font-bold text-3xl text-center mb-5 my-font-gradient'>Checkout</h1>
        <div className='flex justify-center gap-4'>
          <div className='w-full'>
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={e => setName(e.target.value)} value={name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly />
          </div>
          <div className='w-full'>
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input value={email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly />
          </div>
        </div>
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea onChange={e => setAddress(e.target.value)} value={address} id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
        </textarea>
        <div className='flex justify-center gap-4'>
          <div className='w-full'>
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input onChange={e => setPhone(e.target.value)} value={phone} type="text" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className='w-full'>
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode (servicable : 500065)</label>
            <input onChange={e => {
              setPincode(e.target.value)
              setCityState()
            }
            } value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className='flex justify-center gap-4'>
          <div className='w-full'>
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input value={city} type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly
            />
          </div>
          <div className='w-full'>
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input value={state} type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly
            />
          </div>
        </div>
        <div className='  md:px-0 rounded-lg mx-auto mt-10 flex flex-col gap-5' >
          {subTotal && <div className='sidebar  mt-10 text-slate-700  w-full '>
            <h2 className='font-bold text-center mb-4'>Review your Cart Items</h2>
            <ol className='list-decimal flex flex-col  items-center '>
              {Object.keys(cart).length === 0 && <div className='mt-4'>
                Your Cart is empty
              </div>}
              {(stock && Object.keys(stock).length > 0) && Object.keys(cart).map((k) => {
                return (
                  <div key={k} className='font-semibold mx-2 text-xs px-2 w-full' >
                    <div className='flex gap-4 justify-center mb-5 bg-slate-100 py-2 flex-col'>
                      <div className='flex gap-5'>
                        <div className=' flex  gap-8 p-2'>
                          <img src={cart[k].img} className='w-28 rounded-md' />
                        </div>
                        <div className='text-xs flex gap-2 flex-col'>{cart[k].name} | {cart[k].size} | {cart[k].variant}
                          <div className='text-xs'>₹ {cart[k].price}.00</div>
                          {stock[k] >= 10 && <div className='text-green-500'>In Stock</div>}
                          {(stock[k] < 10 && stock[k] >= 1) && <div className='text-red-500'>Hurry Up, only {stock[k]} in stock</div>}
                          {stock[k] == 0 && <div className='text-red-500'>Currently Unavailable</div>}
                          <div className='text-xs'>Quantity: {cart[k].qty}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </ol>
          </div>}


        </div>
        {!initiated && <div className='flex mx-auto font-semibold mt-6  text-white my-bg-color border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full justify-center' onClick={() => setInitiated(true)}>₹ {amountToBePaid}</div>}

        {initiated && <div className=''>
          <div className='flex justify-evenly items-center gap-5 bg-amber-300 p-2 md:p-4 rounded-xl '>
            <AiOutlineInfoCircle className='text-4xl' />
            <p className='w-2/3 text-sm md:text-base'>Dont choose any UPI app to pay. Complete the payment by entering your UPI ID and proceed. This is a Dummy Payment Gateway. So you wont be debited any amount.</p>
          </div>
          {!processing && <button onClick={handlePay} className="flex mx-auto font-semibold mt-6  text-white my-bg-color border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full justify-center">Pay  ₹ {amountToBePaid} </button>}
          {processing && <button disabled className="flex mx-auto mt-10  w-full justify-center">
            <PropagateLoader color="#793FDF" size={20} /> </button>}

        </div>}

      </form>

    </div>
  )
}
