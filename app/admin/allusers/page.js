"use client"
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
export default function AllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    useEffect(() => {
        async function checkIsAdmin() {
          
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/checkadmin`);
            const response = await res.json();
            const isAdmin = response.isAdmin;
            if (!isAdmin) {
           
                router.push("/");
            }
          
            if (response.isAdmin) {
                setIsAdmin(true);
            }
        }
        checkIsAdmin();
    }, [])
    useEffect(() => {
        async function fetchAllUsers() {

            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminallusers`);
            let response = await res.json();
            if (response.ok) {
                const users = response.users;
                setAllUsers(users);
            }
            else {

            }
        }
        fetchAllUsers();
    }, [])

    return (
        <div>
            {isAdmin && <div className="mt-40 md:mt-20">
                <p className="text-center text-2xl py-4">All Users</p>
                <table className="w-1/2 md:w-2/3 mx-auto md:text-sm text-xs text-left text-gray-500 dark:text-gray-400 ">
                    <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-xs ">
                        <tr>
                            <th scope="col" className="px-3 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-3 py-3">
                                User Email
                            </th>

                            <th scope="col" className="px-3 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-3 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => {
                            let date = new Date(user["createdAt"]).toLocaleString('default', {
                                day:
                                    "2-digit",
                                year: "numeric", month: "long"
                            })
                            return (
                                <tr key={user.email} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer ">

                                    <td className="px-1  py-4">
                                        {user.name}
                                    </td>
                                    <td className="px-1  py-4">
                                        {user.email}
                                    </td>

                                    <td className="px-1  py-4">
                                        {date}
                                    </td>
                                    <td className="px-1  py-4">
                                        <button className="my-bg-color text-white p-2 rounded-md" onClick={() => router.push(`/admin/userdetails?email=${user.email}`)}>More</button>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>}


        </div>
    )
}
