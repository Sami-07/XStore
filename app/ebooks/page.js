import React from 'react'
import Link from 'next/link'
import Product from '../../models/Product';
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import connectDB from '../../middleware/mongoose';
import CustomLoader from '../../components/CustomLoader';
export default async function Ebooks() {
    const session = await getServerSession();


    let books = await getBooks();
    return (
        <div>
            {!books && <CustomLoader />}
            {books &&
                <div><section className="text-gray-600 body-font mt-40 md:mt-28">
                    <div className="container px-5 py-5 mx-auto">
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                            {books.length === 0 && <p className='mx-auto'>All the Books are Out of Stock. New Stock Coming Soon. Stay Tuned!</p>}
                            {books.map((book) => {
                                return (
                                    <Link data-aos="fade-up" key={books.slug} className=" p-4 w-full border-slate-200 border mx-auto shadow-lg" href={`/product/${book.slug}`}>
                                        <div >
                                            <img alt="ecommerce" className="rounded-xl h-[20vh] md:h-[50vh] lg:h-[30vh] p-2 mx-auto" src={book.img} />
                                            <div className="mt-1 text-center">
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{book.category.toUpperCase()}</h3>
                                                <h2 className="text-gray-900  title-font text-xs md:text-sm font-medium">{book.title}</h2>

                                                <p className="mt-1 font-semibold">₹ {book.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section></div>}
        </div>
    )
}
export async function getBooks() {
    connectDB()
    let allBooks = await Product.find({ category: "ebooks" })

    return allBooks;
}
