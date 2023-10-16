"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';
import { useCartContext } from '../../components/SubLayout'
import { redirect } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from 'next/navigation';
export default function Login() {
const router = useRouter();
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  useEffect(() => {
    async function createUserFromGoogle() {
      const res1 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserFromSession`);
      const response1 = await res1.json();
      const name = response1.name;
      const email = response1.email;
      const data = { name, email }
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/createuserfromgoogle`, {
        method: "POST",
        headers: {
          ContentType: "application/json"
        },
        body: JSON.stringify(data)
      })
      let response = await res.json()

    }
    if (session.status === "authenticated") {
      createUserFromGoogle()
      // router.push("/")
      window.location.href = "/"
    }
  }, [session.status])

  async function handleSubmit(e) {
    e.preventDefault()
    let res1 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/accounttype`)
    let response1 = await res1.json();
    if (response1.result === "custom signup") {
      toast.error("email exists via google login", {
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
    else {
      const response = await signIn("credentials", {
        email, password,
        redirect: false
      })
      if (response.error) {

        toast.error(response.error, {
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
      else {
        toast.success("Logged in successfully using credentials!", {
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
      setEmail("")
      setPassword("")
    }
  }
  return (
    <div>
      <section className="bg-gray-50 mt-36 md:mt-20 min-h-screen">
        <ToastContainer
        />
        <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0 md:w-[72vw] md:ml-[20vw] lg:w-auto lg:ml-[12vw] ">
          <p className='text-3xl pb-5 md:py-5 my-font-gradient font-black'>Welcome to X Store!</p>
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img className="w-12 h-12 p-2 rounded-md mr-3 bg-black" src="/images/transparent X logo.png" alt="logo" />
            Store
          </a>
          <div className='flex justify-center items-center flex-col lg:flex-row gap-5  w-full '>


            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 h-96 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <button type="submit" className="w-full text-white my-bg-color hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?<Link href="signup" className="font-semibold hover:underline dark:text-primary-500 ml-2 underline">Sign up</Link>
                  </p>
                </form>
              </div>
            </div>
            <p className='mx-auto px-0 md:mx-0'>OR</p>
            <div className='w-full md:w-1/2 lg:w-1/4'>
              <button onClick={() => signIn("google")} className="w-full  bg-transparent hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center gap-8 text-black border-black border-2"><FcGoogle className='rounded-full bg-white text-4xl p-1' />Sign in with Google</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
