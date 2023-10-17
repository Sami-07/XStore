"use client"
import { useState } from 'react'
import Select from 'react-select';
import FilteredResultsComponent from './FilteredResultsComponent';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export default function FilterComponent({ setFilterClicked }) {

    const categories = [
        { value: "Tshirts", label: 'T Shirts' },
        { value: 'Hoodies', label: 'Hoodies' },
        { value: 'ebooks', label: 'E Books' },

    ];
    const priceOptions = [
        { value: "high to low", label: 'High to Low' },
        { value: 'low to high', label: 'Low to High' },
        { value: 'popular', label: 'Popular' },
    ];
    const [category, setCategory] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [colors, setColors] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [incOutOfStock, setIncOutOfStock] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [clicked, setClicked] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();

        setClicked(true);

        if (!category) {
            toast.error("Please Select a Category", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {


            const data = { category, sortValue, colors, authors, sizes, genres, incOutOfStock }
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fetchfiltered`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const response = await res.json();
            setFilteredResults(response.result);

        }
    }
    function handleSize(size) {
        if (sizes.includes(size)) {
            setSizes(sizes.filter((s) => { return s != size }))
        }
        else {
            setSizes(prevSizes => { return [...prevSizes, size] })
        }
    }

    function handleGenres(genre) {
        if (genres.includes(genre)) {
            setGenres(genres.filter((s) => { return s != genre }))
        }
        else {
            setGenres(prevGenres => { return [...prevGenres, genre] })
        }
    }
    function handleColors(color) {
        if (colors.includes(color)) {
            setColors(colors.filter((s) => { return s != color }))
        }
        else {
            setColors(prevColors => { return [...prevColors, color] })
        }
    }
    function handleAuthors(author) {
        if (authors.includes(author)) {
            setAuthors(authors.filter((s) => { return s != author }))
        }
        else {
            setAuthors(prevAuthors => { return [...prevAuthors, author] })
        }
    }
    return (
        <div className='min-h-screen bg-white mt-32  md:mt-20 md: pb-10'>
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
            <div className='w-full'>
                <form className='mt-8 pt-10' onSubmit={handleSubmit}>
                    <div className='ml-10 '>


                        <div className='grid grid-cols-2 mr-10 mb-4 gap-4 md:flex md:flex-col md:gap-0  md:mr-0  '>
                            <span className='text-lg'>Select a Category</span>
                            <Select
                                placeholder="Select"
                                className="md:w-1/3"
                                onChange={option => setCategory(option.value)}
                                options={categories}
                            />
                        </div>
                        <div className='grid grid-cols-2 mr-10 mb-4 gap-4 md:flex md:flex-col md:gap-0  md:mr-0  '>
                            <span className='text-lg' >Sort</span>
                            <Select
                                placeholder="Select"
                                className='md:w-1/3'
                                onChange={option => setSortValue(option.value)}
                                options={priceOptions}
                            />
                        </div>
                        {category !== "ebooks" && <div>
                            <div className='flex flex-col justify-center'>
                                <span className='mb-3  text-lg'>Sizes</span>
                                <div className=' space-x-3'>
                                    <input type='checkbox' onChange={() => handleSize("XS")} id='xs'></input>
                                    <label htmlFor='xs'>XS</label>
                                </div>
                                <div className=' space-x-3'>
                                    <input type='checkbox' onChange={() => handleSize("S")} id='s'></input>
                                    <label htmlFor='s'>S</label>
                                </div>
                                <div className='f space-x-3'>
                                    <input type='checkbox' onChange={() => handleSize("M")} id='m'></input>
                                    <label htmlFor='m'>M</label>
                                </div>
                                <div className=' space-x-3'>
                                    <input type='checkbox' onChange={() => handleSize("L")} id='l'></input>
                                    <label htmlFor='l'>L</label>
                                </div>
                                <div className=' space-x-3'>
                                    <input type='checkbox' onChange={() => handleSize("XL")} id='xl'></input>
                                    <label htmlFor='xl'>XL</label>
                                </div>
                                <div className=' space-x-3'>
                                    <input type='checkbox' onChange={() => handleSize("XXL")} id='2xl'></input>
                                    <label htmlFor='2xl'>XXL</label>
                                </div>
                            </div>
                            <div className='flex flex-col mt-4 justify-center'>
                                <span className='mb-3 text-lg '>Colors</span>
                                <div className=' space-x-3'>
                                    <input type='checkbox' onChange={() => handleColors("Red")} id='red'></input>
                                    <label htmlFor='red'>Red</label>
                                </div>
                                <div className=' space-x-3'>
                                    <input type='checkbox' onChange={() => handleColors("Blue")} id='blue'></input>
                                    <label htmlFor='blue'>Blue</label>
                                </div>
                                <div className='f space-x-3'>
                                    <input type='checkbox' onChange={() => handleColors("Black")} id='black'></input>
                                    <label htmlFor='black'>Black</label>
                                </div>
                                <div className=' space-x-3'>
                                    <input type='checkbox' onChange={() => handleColors("White")} id='white'></input>
                                    <label htmlFor='white'>White</label>
                                </div>
                                <div className=' space-x-3'>
                                    <input type='checkbox' onChange={() => handleColors("Cream")} id='cream'></input>
                                    <label htmlFor='cream'>Cream</label>
                                </div>
                                <div className=' space-x-3'>
                                    <input type='checkbox' onChange={() => handleColors("Purple")} id='purple'></input>
                                    <label htmlFor='purple'>Purple</label>
                                </div>
                            </div>
                        </div>}
                        {category === "ebooks" && <div className='flex flex-col mt-4 justify-center'>
                            <span className='mb-3 text-lg '>Book Genres</span>
                            <div className=' space-x-3'>
                                <input type='checkbox' id='fiction' onChange={() => handleGenres("fiction")}></input>
                                <label htmlFor='fiction'>Fiction</label>
                            </div>
                            <div className=' space-x-3'>
                                <input type='checkbox' id='nonfiction' onChange={() => handleGenres("non fiction")}></input>
                                <label htmlFor='nonfiction'>Non Fiction</label>
                            </div>
                            <div className='f space-x-3'>
                                <input type='checkbox' id='story' onChange={() => handleGenres("story")}></input>
                                <label htmlFor='story'>Story</label>
                            </div>
                            <div className=' space-x-3'>
                                <input type='checkbox' id='fantasy' onChange={() => handleGenres("fantasy")}></input>
                                <label htmlFor='fantasy'>Fantasy</label>
                            </div>
                            <div className=' space-x-3'>
                                <input type='checkbox' id='biography' onChange={() => handleGenres("biography")}></input>
                                <label htmlFor='biography'>Biography</label>
                            </div>

                        </div>}
                        {(category !== "Tshirts" && category !== "Hoodies") && <div className='flex flex-col mt-4 justify-center'>
                            <span className='mb-3 text-lg '>Author</span>
                            <div className=' space-x-3'>
                                <input type='checkbox' id='walter issacson' onChange={() => handleAuthors("Walter Issacson")}></input>
                                <label htmlFor='walter issacson'>Walter Issacson</label>
                            </div>
                            <div className=' space-x-3'>
                                <input type='checkbox' id='davidgoggins' onChange={() => handleAuthors("David Goggins")}></input>
                                <label htmlFor='davidgoggins'>David Goggins</label>
                            </div>
                            <div className='f space-x-3'>
                                <input type='checkbox' id='ryanholiday' onChange={() => handleAuthors("Ryan Holiday")} ></input>
                                <label htmlFor='ryanholiday'>Ryan Holiday</label>
                            </div>
                            <div className=' space-x-3'>
                                <input type='checkbox' id='jkrowling' onChange={() => handleAuthors("J K Rowling")}></input>
                                <label htmlFor='jkrowling'>J.K. Rowling</label>
                            </div>
                            <div className=' space-x-3'>
                                <input type='checkbox' id='ankur' onChange={() => handleAuthors("Ankur Warikoo")}></input>
                                <label htmlFor='ankur'>Ankir Warikoo</label>
                            </div>

                        </div>}
                        <div className='flex flex-col mt-4 justify-center'>
                            <span className='mb-3  text-lg'>Availability</span>
                            <div className=' space-x-3'>
                                <input type='checkbox' id='outofstock' onChange={() => setIncOutOfStock(!incOutOfStock)}></input>
                                <label htmlFor='outofstock'>Include Out of Stock Items</label>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center my-4 md:justify-start md:ml-10'>
                        <button type='submit' className='rounded-md text-sm  px-2 mt-5 bg-purple-600 text-white py-2'>Show Results</button>
                    </div>
                </form>
                {clicked && <FilteredResultsComponent filteredResults={filteredResults} setFilterClicked={setFilterClicked} />}
            </div>


        </div>
    )
}
