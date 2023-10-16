"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useState } from "react"
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../../components/CustomLoader';
export default function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);

    const router = useRouter();
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
    const formData = new FormData();
    const fileData = new FormData();
    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")
    const [img, setImg] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [prevPrice, setPrevPrice] = useState("")
    const [category, setCategory] = useState("")
    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    const [availableQty, setAvailableQty] = useState("")
    const [author, setAuthor] = useState("")
    const [genre, setGenre] = useState("");
    const [pdfFile, setPdfFile] = useState([]);
    const options = [
        { value: "Tshirts", label: 'Tshirts' },
        { value: 'Hoodies', label: 'Hoodies' },
        { value: 'ebooks', label: 'E Books' }

    ];
    const bookGenres = [
        { value: "fiction", label: 'Fiction' },
        { value: 'non fiction', label: 'Non Fiction' },
        { value: 'story', label: 'Story' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'biography', label: 'Biography' }

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
    async function handleAddProduct(e) {

        e.preventDefault();

        formData.append("pdfFile", pdfFile);
        fileData.append("file", pdfFile);
        const data = [{ name, slug, img, desc, price, prevPrice, category, size, color, availableQty, author, genre }]
        for (let item of data) {
            for (const key in item) {
                formData.append(key, item[key]);
            }
        }
        let res1 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/mycloudinaryapi`, {
            method: "POST",
            body: fileData
        })
        let response1 = await res1.json();
        formData.append("pages", response1.pages);
        formData.append("fileName", response1.fileName);
        formData.append("filePath", response1.downloadUrl);
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
            method: "POST",
            body: formData
        })
        let response = await res.json();

        if (response.myStatus) {
            toast.success("Product Added Successfully!", {
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
            toast.error("Couldn't Add Product.", {
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
    return (
        <div className="min-h-screen">
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
            {isAdmin && <div>
                <p className="text-3xl text-center mt-32 md:mt-28"> Add Product</p>
                <form onSubmit={handleAddProduct} className='md:w-1/2 px-4 md:px-0 mx-auto mt-10'>
                    <div className='flex justify-center gap-4'>
                        <div className='w-full'>
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600 blo">Product Name</label>
                            <input onChange={e => setName(e.target.value)} value={name} placeholder="X Store Marvel Avengers Cool Cotton Oversized" type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                            <label htmlFor="image" className="leading-7 text-sm text-gray-600">Product Image URL</label>
                            <input placeholder="xwear-marvel-avengers-cool-cotton-oversized-xxl-pink" onChange={e => setImg(e.target.value)} value={img} type="text" id="image" name="image" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <label htmlFor="desc" className="leading-7 text-sm text-gray-600">Product Description</label>
                    <textarea placeholder="Unleash your inner superhero with the Marvel Edition Xwear Oversized Baggy Fit T-Shirt. Crafted from pure cotton, it blends comfort with heroic style!" onChange={e => setDesc(e.target.value)} value={desc} id="desc" name="desc" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-44 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
                    </textarea>
                    <div className='w-full'>
                        <label htmlFor="category" className="leading-7 text-sm text-gray-600">Category</label>
                        <Select className=""
                            onChange={option => setCategory(option.value)}
                            options={options}
                        />
                    </div>
                    <div className='flex justify-center gap-4'>
                        <div className='w-full'>
                            <label htmlFor="price" className="leading-7 text-sm text-gray-600">Current Price</label>
                            <input onChange={e => setPrice(e.target.value)} value={price} type="text" id="price" name="price" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    {(category === "Tshirts" || category === "Hoodies") && <div className='flex justify-center gap-4'>

                        <div className='w-full'>
                            <label htmlFor="size" className="leading-7 text-sm text-gray-600">Size</label>
                            <Select className=""
                                onChange={option => setSize(option.value)}
                                options={sizeOptions}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="color" className="leading-7 text-sm text-gray-600">Color</label>
                            <Select className=""
                                onChange={option => setColor(option.value)}
                                options={colorOptions}
                            />
                        </div>
                    </div>}
                    {(category === "ebooks") && <div className='flex justify-center gap-4'>

                        <div className='w-full'>
                            <label htmlFor="author" className="leading-7 text-sm text-gray-600">Author</label>
                            <input onChange={e => setAuthor(e.target.value)} value={author} type="text" id="author" name="author" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="bookgenre" className="leading-7 text-sm text-gray-600">Book Genre</label>
                            <Select className=""
                                onChange={option => setGenre(option.value)}
                                options={bookGenres}
                            />
                        </div>
                    </div>}
                    {(category === "ebooks") &&
                        <div className='w-full'>
                            <label htmlFor="pdffile" className="leading-7 text-sm text-gray-600">Upload E Book PDF to Database</label>
                            <input onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setPdfFile(e.target.files[0]);
                                }
                            }} type="file" id="pdffile" name="pdffile" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>}
                    <div className='flex justify-center gap-4'>
                        <div className='w-full'>
                            <label htmlFor="size" className="leading-7 text-sm text-gray-600">Available Quantity (in units)</label>
                            <input onChange={e => setAvailableQty(e.target.value)} value={availableQty} type="text" id="availableQty" name="availableQty" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full my-5 text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add</button>
                </form>
            </div>}
        </div>
    )
}