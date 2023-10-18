"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CustomLoader from '../../components/CustomLoader';
export default function Admin() {
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
      if (response.isAdmin) {
        setIsAdmin(true);
      }
    }
    checkIsAdmin();
  }, [])


  return (
    <div className='flex flex-col justify-center items-center my-5 gap-3 '>
      {isLoading && <CustomLoader />}
      {isAdmin && <div className='mt-32 md:mt-20 flex flex-col justify-center items-center gap-4'>
        <h1 className='text-2xl font-semibold'>Admin Panel</h1>
        <Link className='my-bg-color rounded-md text-white p-2 ' href="/admin/addproducts">Add Product</Link>
        <Link className='my-bg-color rounded-md text-white p-2 ' href="/admin/allorders">View All Orders</Link>
        <Link className='my-bg-color rounded-md text-white p-2 ' href="/admin/allproducts">View Inventory/Stock</Link>
        <Link className='my-bg-color rounded-md text-white p-2 ' href="/admin/allusers">View All Usersk</Link>

      </div>}
    </div>

  )
}
