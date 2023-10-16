"use client"
import { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation"
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../../components/CustomLoader';
export default function OrderDetails() {
    const options = [
        { value: "Pending", label: 'Pending' },
        { value: 'Delivered', label: 'Delivered' },
        { value: 'Shipped', label: 'Shipped' },
        { value: 'Delayed', label: 'Delayed' },
        { value: 'Failed', label: 'Failed' },
    ];
    const searchParams = useSearchParams()
    const [status, setStatus] = useState("")
    const orderId = searchParams.get("orderid")
    const [myOrder, setMyOrder] = useState({})
    const [allProducts, setAllProducts] = useState([])
    const [clicked, setClicked] = useState(false)
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
   
    const [isLoading, setIsLoading] = useState(false);
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
        async function fetchOrderDetails() {
            const data = orderId
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminorderdetails`, {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const response = await res.json();
      
            setMyOrder(response.orderDetails)
            setAllProducts((response.orderDetails)["products"])
          
        }
        fetchOrderDetails()
    }, [clicked])
    async function handleSubmit(e) {
        const data = { orderId, status }
        e.preventDefault();
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatestatus`, {
            method: "POST", headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        )
        const response = await res.json()
        if (response.status) {
            toast.success("Updated Order", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setStatus("")
        }
        else {
            toast.error("Failed to Update Order", {
                position: "top-center",
                autoClose: 2000,
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
            {isLoading && <CustomLoader />}
           {isAdmin && <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white shadow-md p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                                <p className="mb-2">Name: {myOrder.name}</p>
                                <p className="mb-2">Email: {myOrder.email}</p>
                                <p className="mb-2">Phone: {myOrder.phone}</p>
                                <p>Address: {myOrder.address}, {myOrder.city}, {myOrder.state}, {myOrder.pincode}</p>
                            </div>
                            <div className="bg-white shadow-md p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Order Information</h3>
                                <p className="mb-2">Order ID: {myOrder.orderId}</p>
                                <p className="mb-2">Payment Info: {myOrder.paymentInfo}</p>
                                <p className="mb-2">Products:</p>
                                <ul className="list-disc pl-6 mb-4">
                                    {Object.keys(allProducts).map((product, index) => {
                                        {
                                         
                                            return (
                                                <li key={index}>{allProducts[product]["name"]}</li>
                                            )
                                        }
                                    }
                                    )}
                                </ul>
                                <p className="mb-2">Amount: ${myOrder.amount}</p>
                                <p className="mb-2">Payment Status: {myOrder.paymentStatus}</p>
                                <div className="flex items-center mt-2">
                                    <span className="mr-2">Delivery Status: <strong>{myOrder.deliveryStatus}</strong></span>
                                </div>
                                <Select
                                    className="w-full md:w-1/2 mt-4"
                                    onChange={option => setStatus(option.value)}
                                    options={options}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div>
                    <button onClick={(e) => {
                        handleSubmit(e)
                        setClicked(!clicked)
                    }} className="flex ml-3 text-white bg-indigo-500 border-0 py-2 px-4 md:px-6 focus:outline-none hover:bg-indigo-600 rounded text-s">Update</button>
                </div>

            </form>}
        </div>
    )
}
