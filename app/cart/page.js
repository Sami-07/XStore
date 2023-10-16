"use client"
import React, { useEffect, useState } from 'react'
import { useCartContext } from '../../components/SubLayout'
import { PiShoppingBagLight } from 'react-icons/pi';
import { BiSolidPlusSquare } from 'react-icons/bi';
import { BiSolidMinusSquare } from 'react-icons/bi';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react"
import Link from "next/link"
import CustomLoader from '../../components/CustomLoader';
export default function Cart() {
    const session = useSession();

    const { cart, addtoCart, removeItemFromCart, removeFromCart, subTotal, deliveryCharges, amountToBePaid, setAmountToBePaid } = useCartContext();
    const [discount, setDiscount] = useState(0)
    const [discountAppliedBool, setDiscountAppliedBool] = useState(false)
    const [couponCode, setCouponCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [stock, setStock] = useState([]);
    useEffect(() => {
        async function fetchProductInfo() {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getproductinfo`, {
                method: "POST",
                headers: {
                    "Content-Type": "appliation/json"
                },
                body: await JSON.stringify(cart)
            })
            const response = await res.json();
            setStock(response.stockQty)
            setLoading(false)
        }
        fetchProductInfo();
    }, [cart])
    async function handleSubmitCouponCode(e) {

        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/couponcode`, {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(couponCode)
        })
        const response = await res.json();

        if (response.valid) {
            if (!discountAppliedBool) {
                if (subTotal > 999) {
                    setAmountToBePaid(prevSubTotal => prevSubTotal - 200)
                    setDiscount(200)
                    setDiscountAppliedBool(true)
                    toast.success("Yay! Discount applied!", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
                else {
                    toast.error("Your subtotal must be above 999 to apply discount", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
            }
            else {
                toast.error("The Coupon code is already applied", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
        }
        else {
            toast.error("The Entered Coupon Code is not valid", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
    return (
        <div className='min-h-screen'>
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
            {loading && <CustomLoader />}
           {!loading && <div className='sidebar text-slate-700 mt-40 md:mt-24 '>
                <div className='flex flex-col justify-center items-center gap-5 mb-10  mt-5'>
                    <div className='flex items-center justify-center gap-4 mb-5 '>
                        <PiShoppingBagLight className='my-text-color text-3xl' />
                        <h2 className='font-semibold text-2xl'>My Shopping Cart</h2>
                    </div>

                    {Object.keys(cart).length > 0 && <div className='font-semibold self-start ml-6'>Total <span className='font-bold text-xl'>₹{amountToBePaid}.00</span></div>}
                    {Object.keys(cart).length > 0 && <Link href="/checkout" className='' >
                        <button className="flex justify-center text-white w-[90vw] md:w-[85vw] bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg">Proceed to Checkout</button>
                    </Link>}

                </div>
                {Object.keys(cart).length === 0 && <div className='mt-4 text-center'>
                    Your Cart is empty
                    <Link href="/" className='' >
                        <button className="flex justify-center text-white mx-auto mt-5 bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg">Shop Now</button>
                    </Link>
                </div>}
                <div className='md:flex md:gap-6'>
                    <ol className='list-decimal md:w-2/3'>
                        {Object.keys(stock).length > 0 && Object.keys(cart).map((k) => {
                            return (
                                <div key={k} className='font-semibold mx-2' >
                                    <div className='flex gap-4 justify-center mb-5 bg-slate-100 py-2 flex-col'>

                                        <div className='flex gap-5'>
                                            <div className=' flex  gap-8 p-2'>
                                                <img src={cart[k].img} className='w-32 rounded-md' />
                                            </div>
                                            <div className='text-xs md:text-base flex gap-2 flex-col'>{cart[k].name} | {cart[k].size} | {cart[k].variant}
                                                <div className='text-base'>₹ {cart[k].price}.00</div>
                                                {stock[k] >= 10 && <div className='text-green-500'>In Stock</div>}
                                                {(stock[k] < 10 && stock[k] >= 1) && <div className='text-red-500'>Hurry Up, only {stock[k]} in stock</div>}
                                                {stock[k] == 0 && <div className='text-red-500'>Currently Unavailable</div>}
                                                {cart[k].size && <div className=''><span className='font-semibold'>Size: </span>{cart[k].size} </div>}
                                            </div>
                                        </div>
                                        <div className='flex gap-5'>
                                            <div className='flex gap-1 items-center justify-center  border-2' >
                                                <BiSolidMinusSquare className='inline text-3xl text-gray-700' onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} />
                                                <span className='my-text-color px-2'>{cart[k].qty}</span>
                                                <BiSolidPlusSquare className='inline text-3xl text-gray-700' onClick={() => addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} />
                                            </div>
                                            <button className='flex items-center border bg-gray-200 rounded-lg w-20 justify-center p-1' onClick={() => removeItemFromCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}> <MdOutlineDeleteOutline className='text-2xl' /> <span className='text-xs'>Delete</span></button>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </ol>

                    {Object.keys(cart).length > 0 && <div className=' flex gap-4 justify-center'>
                        <form onSubmit={handleSubmitCouponCode} className=' bg-gray-100 py-5 flex flex-col gap-4 '>
                            <div className='flex justify-center gap-4'>
                                <div className=' flex justify-center items-center gap-4'>
                                    <input placeholder="Enter Coupon Code" onChange={e => setCouponCode(e.target.value)} value={couponCode} type="text" id="couponCode" name="couponCode" className="w-full rounded-lg bg-gray-100 bg-opacity-50 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    <button type='submit' className="flex mx-auto font-medium text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base">Apply </button>
                                </div>
                            </div>
                            <div className=' flex flex-col text-lg gap-2  px-16'>
                                <div className='flex justify-between gap-10'><p>Subtotal :</p> <span>₹{subTotal}</span> </div>
                                <div className='flex justify-between gap-10'><p>Delivery Charges : </p><span>₹{deliveryCharges}</span></div>
                                <div className='flex justify-between gap-10'><p>Discount :</p><span>- ₹{discount}</span> </div>
                                <div className='flex justify-between gap-10'><p className='tex'>Total :</p><span>₹{amountToBePaid}</span> </div>
                            </div>
                        </form>
                    </div>}
                </div>
            </div>}



        </div>
    )
}
