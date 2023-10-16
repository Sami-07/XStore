"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../../components/CustomLoader';
export default function EditProduct() {
    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState(0)
    const [prevPrice, setPrevPrice] = useState(0)
    const [category, setCategory] = useState("")
    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    const [availableQty, setAvailableQty] = useState(0)
    const [product, setProduct] = useState({})
    const [img, setImg] = useState("");
    const searchParams = useSearchParams()
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
        const slug = searchParams.get("slug")
        const fetchProduct = async (slug) => {
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminsingleproduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(slug)
            })
            let response = await res.json();

            if (response.ok) {
                setProduct(response.product)
                setName(response.product.title)
                setSlug(response.product.slug)
                setDesc(response.product.desc)
                setPrevPrice(response.product.prevPrice)
                setPrice(response.product.price)
              
                setImg(response.product.img)
                options.map((option) => {
                    if (option.value == response.product.category) {
                        setCategory(option.value)

                    }
                })
                setSize(response.product.size)
                setColor(response.product.color)
                setAvailableQty(response.product.availableQty)


            }
        }
        fetchProduct(slug)

    }, [])
    const options = [
        { value: "Tshirts", label: 'Tshirts' },
        { value: 'Hoodies', label: 'Hoodies' },
        { value: 'ebooks', label: 'E Books' }
    ];
    const sizeOptions = [
        { value: "XS", label: 'XS' },
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'XL', label: 'XL' },
        { value: 'XXL', label: 'XXL' },
        { value: 'XXXL', label: 'XXXL' }
    ];
    const colorOptions = [
        { value: "Red", label: 'Red' },
        { value: 'Blue', label: 'Blue' },
        { value: 'Green', label: 'Green' },
        { value: 'Yellow', label: 'Yellow' },
        { value: 'Pink', label: 'Pink' },
        { value: 'Black', label: 'Black' },
        { value: 'White', label: 'White' },
        { value: 'Purple', label: 'Purple' }
    ];
    const handleUpdate = async (e) => {
        e.preventDefault()
        const data = { slug, name, desc, price, color, size, availableQty, category, img }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateadminproduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const response = await res.json();
        if (response.ok) {
            toast.success("Updated Product Successfully!", {
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
            toast.error("Couldn't Update Product", {
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
        <div>
            <p className="text-3xl text-center my-5">EditProduct</p>
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
            {isAdmin && <form onSubmit={handleUpdate} className='md:w-1/2 px-4 md:px-0 mx-auto mt-10'>
                <div className='flex justify-center gap-4'>
                    <div className='w-full'>
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600 blo">Product Name</label>
                        <input onChange={e => setName(e.target.value)} value={name} placeholder="Xwear Marvel Avengers Cool Cotton Oversized" type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className='flex justify-center gap-4'>
                    <div className='w-full'>
                        <label htmlFor="slug" className="leading-7 text-sm text-gray-600">Product Slug</label>
                        <input placeholder="xwear-marvel-avengers-cool-cotton-oversized-xxl-pink" onChange={e => setSlug(e.target.value)} value={slug} type="text" id="slug" name="slug" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className='flex justify-center gap-4'>
                    <div className='w-full'>
                        <label htmlFor="img" className="leading-7 text-sm text-gray-600">Product Image</label>
                        <input placeholder="xwear-marvel-avengers-cool-cotton-oversized-xxl-pink" onChange={e => setImg(e.target.value)} value={img} type="text" id="img" name="img" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <label htmlFor="desc" className="leading-7 text-sm text-gray-600">Product Description</label>
                <textarea placeholder="Unleash your inner superhero with the Marvel Edition X Store Oversized Baggy Fit T-Shirt. Crafted from pure cotton, it blends comfort with heroic style!" onChange={e => setDesc(e.target.value)} value={desc} id="desc" name="desc" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-44 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
                </textarea>
                <div className='flex justify-center gap-4'>
                    <div className='w-full'>
                        <label htmlFor="prevPrice" className="leading-7 text-sm text-gray-600">Previous Price</label>
                        <input onChange={e => {
                            setPrevPrice(e.target.value)
                        }
                        } value={prevPrice} type="text" id="prevPrice" name="prevPrice" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="price" className="leading-7 text-sm text-gray-600">Current Price</label>
                        <input onChange={e => setPrice(e.target.value)} value={price} type="text" id="price" name="price" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className='flex justify-center gap-4'>
                    <div className='w-full'>
                        <label htmlFor="category" className="leading-7 text-sm text-gray-600">Category</label>
                        <span className='block'>Current Category: <span className='font-semibold'>{product.category}</span> </span>
                        <Select className=""
                            onChange={option => setCategory(option.value)}
                            options={options}
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="size" className="leading-7 text-sm text-gray-600">Size</label>
                        <span className='block'>Current Size: <span className='font-semibold'>{product.size}</span></span>
                        <Select className=""
                            onChange={option => setSize(option.value)}
                            options={sizeOptions}
                        />
                    </div>
                </div>
                <div className='flex justify-center gap-4'>
                    <div className='w-full'>
                        <label htmlFor="color" className="leading-7 text-sm text-gray-600">Color</label>
                        <div className='block' >Current Color: <span className='font-semibold' style={{ color: `${product.color}` }}>{product.color}</span ></div>
                        <Select className=""
                            onChange={option => setColor(option.value)}
                            options={colorOptions}
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="size" className="leading-7 text-sm text-gray-600">Available Quantity (in units)</label>
                        <input onChange={e => setAvailableQty(e.target.value)} value={availableQty} type="text" id="availableQty" name="availableQty" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full my-5 text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
            </form>

            }


        </div>
    )
}
