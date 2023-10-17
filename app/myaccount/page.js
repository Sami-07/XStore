"use client"
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillWarning } from 'react-icons/ai';
import { getSession, useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react"
import { AiOutlineUser } from "react-icons/ai"
import CustomLoader from '../../components/CustomLoader';
export default function MyAccount() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [phone, setPhone] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [mediumPassword, setMediumStrong] = useState(false)
    const [strongPassword, setStrongPassword] = useState("")
    const [isCustomSignup, setIsCustomSignup] = useState(false);
    const session = useSession();
    const [loggedInWithGoogle, setLoggedInWithGoogle] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    useEffect(() => {
        async function fetchAccountType() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/accounttype`)
            const response = await res.json();
     
            if (response.result === "custom signup") {
                setIsCustomSignup(true);
            }
        }
        fetchAccountType();    
    }, [session])
    useEffect(() => {
        async function getUserEmail() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserFromSession`)
            const response = await res.json();
            setEmail(response.email)

            if (response.imgUrl) {
                setLoggedInWithGoogle(true);
                setImgUrl(response.imgUrl)        
            }
            getUserDetails(response.email)
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
     
            setAddress(response.address)
            setPhone(response.phone)
            setPincode(response.pincode)
        }
        getUserEmail()

    }, [session])
    async function handleUpdate(e) {
        e.preventDefault()

        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, { cache: 'no-store' })
        let JSONpins = await pins.json()
        if (Object.keys(JSONpins).includes(pincode)) {
            const data = { email, address, phone, pincode }
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const response = await res.json()
            if (response.msg == "Updated user Successfully") {
                setAddress("")
                setPhone("")
                toast.success("Updated Successfully! Refresh to view updated details.", {
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
        else {
            toast.error("Pincode is not yet servicable.", {
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
    async function handleUpdatePassword(e) {
        e.preventDefault()
        if (newPassword === confirmNewPassword) {
            if (newPassword.length >= 6) {
                const data = { email, newPassword, confirmNewPassword }
              
                let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                let response = await res.json();

                if (response.myStatus) {
                    toast.success(response.msg, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setNewPassword("")
                    setConfirmNewPassword("")
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
            else {
                toast.error("password length should be atleast 6", {
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
        else {
            toast.error("Entered Passwords are different", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setNewPassword("")
            setConfirmNewPassword("")
        }
    }

    return (
        <div>

            {!session && <CustomLoader />}
            {name && <div className='relative top-10 mt-32 md:mt-20 min-h-screen'>
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
                <div className='flex justify-center items-center gap-4'>


                    {loggedInWithGoogle && <img src={imgUrl} className='w-10 rounded-full h-10' />}
                    {!loggedInWithGoogle && <AiOutlineUser className='text-black border-black border-2 rounded-full text-3xl' />}
                    <p className='text-3xl font-semibold text-center open ' data-aos="fade-up">
                        Personal Information
                    </p>
                </div>
                <div className='md:w-1/2 px-4 md:px-0 mx-auto'>
                    <div className='flex justify-center items-center gap-4 data-aos="fade-up"'>
                        <svg fill="#793FDF" height="100px" width="180px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 214.27 214.27" >
                            <g>
                                <path d="M196.926,55.171c-0.11-5.785-0.215-11.25-0.215-16.537c0-4.142-3.357-7.5-7.5-7.5c-32.075,0-56.496-9.218-76.852-29.01
		c-2.912-2.832-7.546-2.831-10.457,0c-20.354,19.792-44.771,29.01-76.844,29.01c-4.142,0-7.5,3.358-7.5,7.5
		c0,5.288-0.104,10.755-0.215,16.541c-1.028,53.836-2.436,127.567,87.331,158.682c0.796,0.276,1.626,0.414,2.456,0.414
		c0.83,0,1.661-0.138,2.456-0.414C199.36,182.741,197.954,109.008,196.926,55.171z M107.131,198.812
		c-76.987-27.967-75.823-89.232-74.79-143.351c0.062-3.248,0.122-6.396,0.164-9.482c30.04-1.268,54.062-10.371,74.626-28.285
		c20.566,17.914,44.592,27.018,74.634,28.285c0.042,3.085,0.102,6.231,0.164,9.477C182.961,109.577,184.124,170.844,107.131,198.812
		z"/>
                                <path d="M132.958,81.082l-36.199,36.197l-15.447-15.447c-2.929-2.928-7.678-2.928-10.606,0c-2.929,2.93-2.929,7.678,0,10.607
		l20.75,20.75c1.464,1.464,3.384,2.196,5.303,2.196c1.919,0,3.839-0.732,5.303-2.196l41.501-41.5
		c2.93-2.929,2.93-7.678,0.001-10.606C140.636,78.154,135.887,78.153,132.958,81.082z"/>
                            </g>
                        </svg>
                        <div data-aos="fade-up" className='my-10 text-xs md:text-sm'>Update your personal information effortlessly! Easily modify your address, city, and pincode on our account page to ensure accurate and seamless deliveries.</div>
                    </div>
                    <form onSubmit={handleUpdate} data-aos="fade-up" >

                        <div className='flex justify-center gap-4 flex-col md:flex-row'>
                            <div className='w-full opacity-50'>
                                <label htmlFor="name" className="leading-7 my-text-color  text-xs md:text-sm text-gray-600">Name <span className='text-black'> (For security reasons, your name cannot be changed)</span></label>
                                <input value={name} type="text" id="name" name="name" className="w-full bg-gray-100 rounded-xl bg-opacity-50  border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly
                                />
                            </div>
                            <div className='w-full opacity-50'>
                                <label htmlFor="email" className="leading-7 my-text-color  text-xs md:text-sm text-gray-600">Email <span className='text-black'> (For security reasons, your email cannot be changed)</span></label>
                                <input value={email} type="email" id="email" name="email" className="w-full bg-gray-100 rounded-xl bg-opacity-50  border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    readOnly />
                            </div>
                        </div>
                        <label htmlFor="address" className="leading-7 my-text-color  text-xs md:text-sm text-gray-600">Address</label>
                        <textarea onChange={e => setAddress(e.target.value)} value={address} id="address" name="address" className="w-full bg-gray-100 rounded-xl bg-opacity-50  border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
                        </textarea>
                        <div className='flex justify-center gap-4'>
                            <div className='w-full'>
                                <label htmlFor="pincode" className="leading-7 my-text-color  text-xs md:text-sm text-gray-600">Pincode     (servicable : 500065)</label>
                                <input onChange={e => setPincode(e.target.value)} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-gray-100 rounded-xl bg-opacity-50  border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className='flex justify-center gap-4'>
                            <div className='w-full'>
                                <label htmlFor="phone" className="leading-7 my-text-color  text-xs md:text-sm text-gray-600">Phone</label>
                                <input onChange={e => setPhone(e.target.value)} value={phone} type="text" id="phone" name="phone" className="w-full bg-gray-100 rounded-xl bg-opacity-50  border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <button type='submit' className="flex mx-auto font-semibold mt-6  text-white bg-indigo-500 border-0 w-28 py-2 px-3 justify-center focus:outline-none hover:bg-indigo-600 rounded-md text-lg">Save</button>
                    </form>
                    {isCustomSignup && <div className='px-4 md:px-0 mx-auto  mt-20'>
                        <p className='text-3xl font-semibold text-center '>
                            Update Password
                        </p>
                        <div className='flex justify-center items-center gap-4'>
                            <AiFillWarning className='text-7xl text-yellow-400 w-1/2 md:w-1/3' /><p className='my-10 text-xs md:text-sm'>Update your personal information effortlessly! Easily modify your address, city, and pincode on our account page to ensure accurate and seamless deliveries.</p>
                        </div>
                        <form onSubmit={handleUpdatePassword} >
                            <div className='flex justify-center gap-4 flex-col md:flex-row my-5'>
                                <div className='w-full '>
                                    <label htmlFor="newPassword" className="leading-7 my-text-color  text-xs md:text-sm">Enter New Password</label>
                                    <input onChange={(e => {
                                        setNewPassword(e.target.value)
                                        if ((e.target.value).length <= 6) {
                                            setMediumStrong(true);
                                        }
                                        else if ((e.target.value).length > 6 && ((e.target.value).includes("$") || (e.target.value).includes("@") || (e.target.value).includes("&") || (e.target.value).includes("*") || (e.target.value).includes("#") || (e.target.value).includes("!"))) {
                                            setStrongPassword(true);
                                            setMediumStrong(false)
                                        }
                                        else {
                                            setMediumStrong(false)
                                            setStrongPassword(false)

                                        }
                                    })} value={newPassword} type="password" id="newPassword" name="newPassword" className="w-full bg-gray-100 rounded-xl bg-opacity-50  border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="confirmNewPassword" className="leading-7 my-text-color  text-xs md:text-sm text-gray-600">Confirm New Password</label>
                                    <input onChange={(e => { setConfirmNewPassword(e.target.value) })} value={confirmNewPassword} type="password" id="confirmNewPassword" name="confirmNewPassword" className="w-full bg-gray-100 rounded-xl bg-opacity-50  border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            {mediumPassword && <p className='text-yellow-400 text-xs my-4 font-medium'>Use special characters such as @, $, & to make your password strong.</p>}
                            {strongPassword && <p className='text-green-500 text-xs my-4 font-medium'>Your password looks strong</p>}
                            <button type='submit' className="flex mx-auto font-semibold mt-6  text-white bg-indigo-500 border-0  py-2 px-3 justify-center focus:outline-none hover:bg-indigo-600 rounded-md text-lg">Update Password</button>
                        </form>
                    </div>}
                </div>
            </div>}
        </div>
    )
}
