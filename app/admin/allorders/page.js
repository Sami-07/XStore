"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import CustomLoader from "../../../components/CustomLoader"
export default function AllOrders() {
  const [allOrders, setAllOrders] = useState([])
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    async function checkIsAdmin() {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/checkadmin`);
      const response = await res.json();
      const isAdmin = response.isAdmin;
      if (!isAdmin) {
        setIsLoading(false)
    
        router.push("/");
      }
      setIsLoading(false)
      if(response.isAdmin){
        setIsAdmin(true);
      }
    }
    checkIsAdmin();
  }, [])
  useEffect(() => {
    async function getAllOrders() {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminallproducts`);
      let parsedOrders = await res.json();
      setAllOrders(parsedOrders.allOrders)

    }
    getAllOrders()
  }, [])
  async function handleClick(orderId) {
    window.location.href = `${process.env.NEXT_PUBLIC_HOST}/admin/orderdetails?orderid=${orderId}`


  }
  return (
    <div>
      {isLoading && <CustomLoader />}
      {isAdmin && <div>

        <p className='text-4xl text-center mt-10'>All Orders</p>
        <div className="    mt-10">
          <table className="w-1/2 md:w-2/3 mx-auto md:text-sm text-xs text-left text-gray-500 dark:text-gray-400">
            <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-3 py-3">
                  Placed On
                </th>
                <th scope="col" className="px-3 py-3">
                  Total
                </th>
                <th scope="col" className="px-3 py-3">
                  Status
                </th>
                <th scope="col" className="px-3 py-3">
                  Check Details
                </th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => {
                let date = new Date(order["createdAt"]).toLocaleString('default', {
                  day:
                    "2-digit",
                  year: "numeric", month: "long"
                })
                return (
                  <tr key={order["orderId"]} onClick={() => handleClick(order["orderId"])} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      &#x23; {order["orderId"]}
                    </th>
                    <td className="px-1  py-4">
                      {date}
                    </td>
                    <td className="px-1  py-4">
                      ₹ {order["amount"]}
                    </td>
                    <td className="px-1  py-4">
                      {order["deliveryStatus"]}
                    </td>
                    <td className="px-1  py-4">
                      <button onClick={() => handleClick(order["orderId"])} className="flex ml-3 text-white bg-indigo-500 border-0 py-2 px-4 md:px-6 focus:outline-none hover:bg-indigo-600 rounded text-xs">View</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>}
    </div>


  )
}
