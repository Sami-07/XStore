"use client"
import { useEffect, useState } from "react";
import { FaPhoneVolume, FaLocationDot, FaEnvelope } from "react-icons/fa6";
// import { ContactFunction } from "@/lib/ContactFunction";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getUserEmail() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserFromSession`)
      const response = await res.json();
      const userEmail = response.email;
      setEmail(userEmail)
   
      getUserDetails(userEmail)
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
    

    }
    getUserEmail()
  }, [])
  async function handleSubmit(e) {
    setLoading(true);
    const data = { name, email, phone, sub, desc };
    e.preventDefault();
    setLoading(true);
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/contactmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let response = await res.json();
    if (response.ok) {
      toast.success("Query Sent Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      setName("");
      setEmail("");
      setPhone("");
      setDesc("");
      setSub("");
    }
    else {
      toast.error("Couldn't sent Query. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }


  }

  return (
    <div>

      <ToastContainer
        position="top-right"
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
      <div className="mainContact mt-40 md:mt-28 text-sm px-4" data-aos="fade-up">
        <p className="text-center text-4xl p-0 m-auto mt-8 mb-2">CONTACT</p>
        <p className="text-center opacity-70 mb-10">If you have any queries, feel free to message here or connect with us directly via phone call.</p>
        <div className="flex justify-center flex-col md:flex-row items-center rounded-2xl">
          <div className="my-bg-color rounded-xl w-80 h-96 md:rounded-tr-none text-sm md:rounded-br-none  shadow-lg p-8">
            <p className="text-white text-lg md:text-3xl">Contact Details</p>
            <p className="text-white opacity-70 mb-10">Fill the adjacent form. Describe your query briefly. You will receive a reply within 24 hours.</p>
            <div className="max-w-300 m-0 auto">
              <div className="flex items-center mb-4 space-x-4">
                <div className="bg-white p-2 rounded-full">
                  <FaPhoneVolume />
                </div>
                <p className="w-96 text-white">+91 7989487552</p>
              </div>
              <div className="flex items-center mb-4 space-x-4">
                <div className="bg-white p-2 rounded-full">
                  <FaEnvelope />
                </div>
                <p className="w-96 text-white">s.a.sami359359@gmail.com</p>
              </div>
              <div className="flex items-center mb-4 space-x-4">
                <div className="bg-white p-2 rounded-full">
                  <FaLocationDot />
                </div>
                <p className="w-96 text-white">Hyderabad, Telangana</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white w-96 h-1/2 md:h-96 rounded-tr-2xl rounded-br-2xl shadow-lg p-8">
            <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                name="user_name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border-b-2 border-gray-400 p-2 focus:outline-none opacity-80" readOnly
              />
              <input
                type="email"
                placeholder="Email"
                name="user_email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border-b-2 border-gray-400 p-2 focus:outline-none opacity-80" readOnly
              />
              <input
                type="text"
                placeholder="Phone No"
                name="user_phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="border-b-2 border-gray-400 p-2 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                onChange={(e) => setSub(e.target.value)}
                value={sub}
                className="border-b-2 border-gray-400 p-2 focus:outline-none"
              />
            </div>
            <textarea
              className="h-36 w-full rounded-xl resize-none border p-2 mt-4 focus:outline-none border-gray-400"
              placeholder="Describe your query in short here..."
              name="message"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            ></textarea>
            <div className="flex justify-center">

              {!loading && <button type="submit" value="send" className="w-32 h-10 text-xl my-bg-color text-white  rounded-xl my-5 cursor-pointer">
                Send
              </button>
              }

              {loading && <button className="w-32 h-10 text-xl my-bg-color text-white  rounded-xl my-5 cursor-pointer">
                <ClipLoader color="white" size={20} aria-label="Loading Spinner" data-testid="loader" />
              </button>}


            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
