"use client"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation";
export default function AllUsers() {
    const searchParams = useSearchParams()

    const query = searchParams.get('email')
    const userKeys = [
        "name",
        "email",
        "phone",
        "address",
        "pincode",
        "accountType"
    ]
    const [userInfo, setUserInfo] = useState({});
    const [createdDate, setCreatedDate] = useState("");
    const [createdTime, setCreatedTime] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
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
        async function fetchUserInfo() {

            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminuserinfo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: query })
            });
            let response = await res.json();
            if (response.ok) {
                const info = response.userInfo;
                setUserInfo(info);
                let date = new Date(info["createdAt"])
                let cDate = date.toLocaleString('default', {
                    day:
                        "2-digit",
                    year: "numeric", month: "long"
                })
                let cTime = date.toLocaleTimeString();
                setCreatedTime(cTime);
                setCreatedDate(cDate);
            }
            else {

            }
        }
        fetchUserInfo();
    }, [])

    return (
        <div>
            {isAdmin && <div className="mt-40 md:mt-20">
                <p className="text-center text-2xl py-4">User Info.</p>
                <div>
                    {
                        userInfo && userKeys.map(eachKey => {

                            return (
                                <div key={eachKey} className="grid grid-cols-2 items-center space-y-2 gap-2 px-4 md:w-1/2 mx-auto">
                                    <p className="mt-4">{eachKey.toUpperCase()}</p>
                                    {userInfo[eachKey] && <p>{userInfo[eachKey]}</p>}
                                    {!userInfo[eachKey] && <p className="font-semibold">Not Yet Added.</p>}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="grid grid-cols-2 items-center space-y-2 gap-2 px-4 md:w-1/2 mx-auto">
                    <p className="mt-4">Account Created On</p>
                    <p>{createdDate}</p>
                </div>
                <div className="grid grid-cols-2 items-center space-y-2 gap-2 px-4 md:w-1/2 mx-auto">
                    <p className="mt-4">Account Created At</p>
                    <p>{createdTime}</p>
                </div>
            </div>}


        </div>
    )
}
