"use client"
import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from 'next/link';
import CustomLoader from '../../components/CustomLoader';
export default function page() {
    const session = useSession();
    const [loading, setIsLoading] = useState(false);
    const [allOrders, setAllOrders] = useState([])
    function handleClick(orderId) {
        window.location.href = `${process.env.NEXT_PUBLIC_HOST}/order?orderid=${orderId}`
    }
    useEffect(() => {
        async function getAllOrders() {
            setIsLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserFromSession`)
            const response = await res.json();
            const email = response.email
            if (session) {
                let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getallorders`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(email)
                })
                const response = await res.json();
                let sortedOrders = (response.allOrders).sort((a, b) => a["createdAt"] > b["createdAt"] ? -1 : 1
                )
                setAllOrders(sortedOrders)
                setIsLoading(false);

            }
            else {
                window.location.href = "/"
                setIsLoading(false);
            }
        }
        getAllOrders()
    }, [])

    return (
        <div>
            {loading && <CustomLoader />}
            {allOrders && <div className='px-4 mt-40 md:mt-28'>
                <h1 className='text-3xl text-center mb-10 my-font-gradient' data-aos="fade-up"> My Orders</h1>
                {allOrders.length === 0 && <p className='text-center' data-aos="fade-up">No Orders Placed Yet.</p>}
                <div className='flex flex-col gap-4 min-h-screen'>
                    {allOrders.map((order) => {
                        let firstProductImg = order["products"][Object.keys(order["products"])[0]]["img"]
                        let firstProductTitle = order["products"][Object.keys(order["products"])[0]]
                        ["name"]
                        let firstProductPrice = order["products"][Object.keys(order["products"])[0]]
                        ["price"]
                        let noOfProducts = parseInt(Object.keys(order["products"]).length) - 1
                        let orderId = order["orderId"]

                        let date = new Date(order["createdAt"]).toLocaleString('default', {
                            day:
                                "2-digit",
                            year: "numeric", month: "long"
                        })
                        return (
                            <Link data-aos="fade-up" href={`/order?orderid=${orderId}`} className='w-full md:w-[60vw] mx-auto flex flex-col shadow-lg border-2  p-2 rounded-md'>
                                <div className='border-b-2 mb-2'>
                                    <div className='grid grid-cols-4 gap-6'>
                                        <p className='font-semibold'>Order ID</p>
                                        <p className='font-semibold'>Placed On</p>
                                        <p className='font-semibold'>Delivery Status</p>
                                        <p className='font-semibold'>Net Total</p>
                                    </div>
                                    <div className='grid grid-cols-4 gap-6'>
                                        <p>#{orderId}</p>
                                        <p>{date}</p>
                                        <p className='text-left'>{order["deliveryStatus"]}</p>
                                        <p>₹ {order["amount"]}</p>
                                    </div>
                                </div>
                                <div className='flex justify-around gap-4 items-center mb-2 '>
                                    <img src={firstProductImg} className='w-14'></img>
                                    <p className='text-xs w-[50vw] md:w-auto md:text-sm'>{firstProductTitle}</p>
                                    <p>₹ {firstProductPrice}</p>
                                </div>
                                {(noOfProducts + 1) > 1 && <p className='text-lg text-center font-semibold'>+ {noOfProducts} More Products</p>}

                                <button className="flex  border-purple-600  w-full border-2 py-1 font-medium px-6 focus:outline-none text-md bg-purple-500 text-white  justify-center rounded">View Order Details
                                </button>
                            </Link>
                        )
                    })}
                </div>
            </div>}
        </div>
    )
}
