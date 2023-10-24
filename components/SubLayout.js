"use client"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import Searchbar from "../components/searchbar"
import { PiShoppingCartLight } from 'react-icons/pi';
import { MdOutlineLocationOn } from 'react-icons/md';
import { AiOutlineDown } from 'react-icons/ai';
import { AiOutlineUp } from 'react-icons/ai';
import Link from 'next/link'
import AuthProvider from "../components/AuthProvider"
import { signIn, useSession, signOut } from 'next-auth/react';
import CustomLoader from "../components/CustomLoader"
import FilterComponent from "./FilterComponent"
const CartContext = createContext();
export function useCartContext() {
    return useContext(CartContext);
}
export default function SubLayout({ children }) {
    const [deliveryCharges, setDeliveryCharges] = useState(0);
    const router = useRouter()
    const [cart, setCart] = useState({})
    const [numberOfItems, setNumberOfItems] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [amountToBePaid, setAmountToBePaid] = useState(0)
    const [user, setUser] = useState({ value: null })
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [progress, setProgress] = useState(0)
    const pathname = usePathname()
    const couponCodes = ["123", "234"]
    const [userName, setUserName] = useState("");
    const [pincode, setPincode] = useState("");
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState("");
    const [filterClicked, setFilterClicked] = useState(false);
    const { data: session, status } = useSession()
    const [sessionName, setSessionName] = useState("")
    const [sessionEmail, setSessionEmail] = useState("")
    useEffect(() => {

        setProgress(100)
    }, [pathname]
    )
    useEffect(() => {
        if (session) {
            setSessionEmail(session.user.email)
            setSessionName(session.user.name)
        }
        setProgress(100)
    }, [session]
    )
    useEffect(() => {
        async function getUserEmail() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserFromSession`)
            const response = await res.json();
            setEmail(response.email)
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
            setUserName(response.name);

            setPincode(response.pincode)
            setCityState(response.pincode);
        }
        async function setCityState(passedPincode) {
            let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, { cache: 'no-store' })
            let JSONpins = await pins.json()

            if (Object.keys(JSONpins).includes(passedPincode)) {
                setCity(JSONpins[passedPincode][0])
            }
            else {
                setCity("")
            }
        }
        getUserEmail()
        try {
            if (localStorage.getItem("cart")) {
                const savedCart = JSON.parse(localStorage.getItem("cart"));
                setCart(savedCart);
                setNumberOfItems(Object.keys(savedCart).length)
                updateSubTotal(savedCart);
            }
        }
        catch (err) {
            localStorage.clear()
        }
    }, [status])

    function updateSubTotal(myCart) {
        let subt = 0;
        let keys = Object.keys(myCart);

        for (let i = 0; i < keys.length; i++) {
            subt += myCart[keys[i]].price * myCart[keys[i]].qty;
        }
        setSubTotal(subt);
        if (subt > 999) {
            setAmountToBePaid(subt);
            setDeliveryCharges(0)
        }
        else {
            setDeliveryCharges(99)
            setAmountToBePaid(subt + 99);
        }

    }
    function addtoCart(itemCode, qty, price, name, size, variant, img, category) {
        if (session) {
            let newCart = cart;
            if (itemCode in cart) {
                newCart[itemCode].qty = cart[itemCode].qty + 1
            }
            else {
                newCart[itemCode] = { qty: 1, price, name, size, variant, img, category }
            }
            setCart(newCart)
            updateSubTotal(newCart)
            saveCart(newCart)
            notifySuccess("Added to Cart!", "top-center")
        }
        else {
            notifyFailure("Signup to shop at X Store", "top-center")
        }
    }

    function buyNow(itemCode, qty, price, name, size, variant, img, category) {
        if (session) {
            let newCart = {}
            newCart[itemCode] = { qty: 1, price, name, size, variant, img, category }

            setCart(newCart)
            saveCart(newCart)
            updateSubTotal(newCart)
        }
        else {
            notifyFailure("Signup to shop at X Store", "top-center")
        }

    }
    function saveCart(myCart) {
        localStorage.setItem("cart", JSON.stringify(myCart))

    }
    function clearCart() {
        setCart({}) //It is a request. Its not an order. It doesn't get fullfilled as soon as it is seen
        saveCart({})

    }
    function removeFromCart(itemCode, qty, price, name, size, variant) {
        let newCart = cart;
        if (itemCode in cart) {
            newCart[itemCode].qty = cart[itemCode].qty - 1
        }
        if (newCart[itemCode].qty <= 0) {
            delete newCart[itemCode]
        }
        setCart(newCart)
        updateSubTotal(newCart);
        saveCart(newCart)
    }
    function removeItemFromCart(itemCode, qty, price, name, size, variant) {
        let newCart = cart;
        if (itemCode in cart) {
            newCart[itemCode].qty = cart[itemCode].qty - qty
        }
        if (newCart[itemCode].qty <= 0) {
            delete newCart[itemCode]
        }
        setCart(newCart)
        updateSubTotal(newCart);
        saveCart(newCart)
        toast.success("Item Deleted", {
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
    function notifySuccess(message, position) {
        toast.success(message, {
            position: position,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
    function notifyDefault(message, position) {
        toast(message, {
            position: position,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    function notifyFailure(message, position) {
        toast.error(message, {
            position: position,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (

        <CartContext.Provider
            value={{ cart, addtoCart, buyNow, removeFromCart, removeItemFromCart, subTotal, setSubTotal, deliveryCharges, amountToBePaid, setAmountToBePaid, clearCart, notifySuccess, notifyDefault, notifyFailure, setFilterClicked }}
        > <div>
                <Navbar />
                <div className='md:w-[92vw] md:ml-[10vw] lg:ml-[8vw]'>

                    <div>
                        <div className=''>
                            <div className='fixed top-12 w-full md:top-0 z-40'>
                                <Searchbar />
                            </div>

                            <div className='text-white text-xs open-font my-bg-color  fixed top-24 font-medium py-2 px-1 flex gap-2 items-center  md:top-12 w-full z-30'>
                                <MdOutlineLocationOn className='text-xl ' />
                                {sessionName && <div>

                                    {(city && pincode) && <span className='z-30 py-2'>Deliver to {sessionName} - {city}, {pincode}</span>}
                                    {(!city || !pincode) && <span className='z-30 py-2'>Deliver to {sessionName} </span>}

                                </div>}
                                {!sessionName && <span className='z-30 py-2'>Please Login</span>}
                            </div>


                            <Link href="/cart"> <PiShoppingCartLight className='text-white text-5xl block z-50  fixed top-0 my-bg-color rounded-full p-2 right-4 ' />  {cart && <div className='  bg-red-400 fixed text-xs top-1 right-2 rounded-full py-0.5  w-5 text-center z-50'>{Object.keys(cart).length}</div>}
                            </Link>
                            {sessionName && <div onClick={() => setFilterClicked(!filterClicked)} className='text-xs top-24 my-bg-color md:top-12 z-30 mt-2 absolute right-2 text-white px-1 py-1 flex justify-center items-center gap-1 rounded-lg cursor-pointer'> {!filterClicked && <AiOutlineDown className='text-xs' />}
                                {filterClicked && <AiOutlineUp className='text-xs' />}

                                <span>Filters</span></div>}
                            {filterClicked &&
                                <div className='absolute top-2 z-20 w-full'> <FilterComponent setFilterClicked={setFilterClicked} /> </div>}
                        </div>
                        <div className=''>
                            {children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </CartContext.Provider>

    )
}
