"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../../components/CustomLoader';
export default function AllProducts() {
    const [products, setProducts] = useState([])
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
            if (response.isAdmin) {
                setIsAdmin(true);
            }
        }
        checkIsAdmin();
    }, [])
    useEffect(() => {

        const fetchProducts = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getadminproducts`);
            const allProducts = await res.json();
            if (allProducts.ok) {
                setProducts(allProducts.products)

            }
            else {

            }
        }
        fetchProducts();

    }, [products])
    const editPage = async (slug) => {
        window.location.href = `${process.env.NEXT_PUBLIC_HOST}/admin/updateproduct?slug=${slug}`
    }
    const removeProduct = async (id) => {
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteproduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        })
        let response = res.json();
        if (res.ok) {
            toast.success("Product removed from Inventory", {
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
            toast.error("Failed to remove Product from Inventory", {
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
        <div className="container mx-auto py-8 w-[80vw]">
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
            {isAdmin && <div className='mt-40 text-center '>
            <h1 className="text-2xl font-semibold mb-4 text-center'">All Products</h1>
{products.length ===0 && <p className='text-center'>No Products in the Inventory.</p>}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-screen">
                    {products.map(product => (
                        <div key={product.slug} className="bg-white flex flex-col shadow-md p-4 gap-1 rounded-lg">
                            <img className="w-40 mx-auto mb-2 m-auto" src={product.img} alt={product.title} />
                            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                            <p className="text-gray-600">Category: {product.category}</p>
                            <p className="text-gray-600">Price: ₹ {product.price}</p>
                            <p className="text-gray-600">Available Qty: {product.availableQty}</p>
                            <p className="text-gray-600">Color: {product.color}</p>
                            <p className="text-gray-600">Size: {product.size}</p>
                            <p className="mt-2">{product.description}</p>
                            <button onClick={() => editPage(product.slug)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Edit
                            </button>
                            <button onClick={() => removeProduct(product._id)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>}
        </div>










    )
}
