import React from 'react'
import { useState } from 'react'
import { bookbaseUrl } from '../../axiosInstane.js';
import axios from 'axios';
import { useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";

function Form() {

    const [bookForm, setBookForm] = useState({
        "BookName": "",
        "BookTitle": "",
        "Author": "",
        "SellingPrice": "",
        "PublishDate": "",
        "Id": "",
    });

    const [bookList, setBookList] = useState([]);

    const [isUpdating, setisUpdating] = useState(false);


    const getAllBookList = async () => {
        try {
            const { data } = await bookbaseUrl.get("booklists");
            setBookList(data?.bookList)
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllBookList();
    }, [])

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setBookForm((prev) => ({
            ...prev, // Spread the previous state
            [name]: value// Update the changed field
        }))
    }

    const handleSubmit = async () => {
        try {

            if (!isUpdating) {
                if (!bookForm?.BookName || !bookForm?.BookTitle || !bookForm?.Author || !bookForm?.SellingPrice) {
                    alert("all fields are required");
                }
                const { data } = await bookbaseUrl.post("/addbook", bookForm);
                if (data?.Success) {
                    alert(data?.Message);
                    setBookForm({
                        "BookName": "",
                        "BookTitle": "",
                        "Author": "",
                        "SellingPrice": "",
                        "PublishDate": "",
                        "Id": "",
                    })
                }
            } else {
                const { data } = await bookbaseUrl.put("/updatebook", bookForm);
                if (data?.Success) {
                    alert(data?.Message);
                    setBookForm({
                        "BookName": "",
                        "BookTitle": "",
                        "Author": "",
                        "SellingPrice": "",
                        "PublishDate": "",
                        "Id": "",
                    })
                    setisUpdating(false)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await bookbaseUrl.post("deletebook", { Id: id })
            if (data?.Success) {
                alert(data?.Message)
                getAllBookList()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (data) => {
        setBookForm({
            "BookName": data?.BookName,
            "BookTitle": data?.BookTitle,
            "Author": data?.Author,
            "SellingPrice": data?.SellingPrice,
            "PublishDate": data?.PublishDate,
            "Id": data?._id,
        });
        setisUpdating(true)
    };

    return (
        <div className="w-full px-5 min-h-[calc(100vh-60px)] mt-4">
            {/* Form Section */}
            <div className="w-full bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {[
                    { label: 'Book Name', name: 'BookName', type: 'text', placeholder: 'Book name' },
                    { label: 'Book Title', name: 'BookTitle', type: 'text', placeholder: 'Book title' },
                    { label: 'Author', name: 'Author', type: 'text', placeholder: 'Author name' },
                    { label: 'Selling Price', name: 'SellingPrice', type: 'text', placeholder: 'e.g., 499' },
                    { label: 'Publish Date', name: 'PublishDate', type: 'date', placeholder: '' },
                ].map((field) => (
                    <div key={field.name} className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">{field.label}</label>
                        <input
                            type={field.type}
                            placeholder={field.placeholder}
                            name={field.name}
                            value={bookForm[field.name]}
                            onChange={handleFormChange}
                            className="border border-gray-300 rounded-md h-10 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-end mt-4">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
                >
                    Submit
                </button>
            </div>

            {/* Table Section */}
            <div className="w-full mt-10">
                <div className="overflow-x-auto rounded-xl shadow-md">
                    <table className="min-w-full bg-white divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                {['Book Name', 'Book Title', 'Author', 'Selling Price', 'Publish Date', 'Actions'].map((col) => (
                                    <th
                                        key={col}
                                        className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bookList?.map((book, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.BookName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.BookTitle}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.Author}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.SellingPrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{book.PublishDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex gap-3 items-center">
                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                className="bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-full transition"
                                                title="Delete"
                                            >
                                                <MdDelete />
                                            </button>
                                            <button
                                                onClick={() => handleUpdate(book)}
                                                className="bg-green-100 text-green-600 hover:bg-green-200 p-2 rounded-full transition"
                                                title="Edit"
                                            >
                                                <FaPenNib />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    )
}

export default Form

/*
<div className=' w-full px-5 min-h-[calc(100vh-60px)] mt-4'>
            <div className=' w-full grid grid-cols-5 gap-3'>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor=''>Book Name</label>
                    <input type='text' placeholder='book name' className=' w-full border border-gray-100 rounded-sm outline-1 outline-gray-300 h-8 px-4'
                        name='BookName'
                        value={bookForm.BookName}
                        onChange={handleFormChange}
                    />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor=''>Book title</label>
                    <input type='text' placeholder='book title' className=' w-full border border-gray-100 rounded-sm outline-1 outline-gray-300 h-8 px-5'
                        name='BookTitle'
                        value={bookForm.BookTitle}
                        onChange={handleFormChange}
                    />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor=''>Author</label>
                    <input type='text' placeholder='author' className=' w-full border border-gray-100 rounded-sm outline-1 outline-gray-300 h-8 px-5'
                        name='Author'
                        value={bookForm.Author}
                        onChange={handleFormChange}
                    />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor=''>Selling Price</label>
                    <input type='text' placeholder='selling price' className=' w-full border border-gray-100 rounded-sm outline-1 outline-gray-300 h-8 px-5'

                        name='SellingPrice'
                        value={bookForm.SellingPrice}
                        onChange={handleFormChange}
                    />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor=''>Publish Date</label>
                    <input type='date' placeholder='publish date' className=' w-full border border-gray-100 rounded-sm outline-1 outline-gray-300 h-8 px-5'
                        name='PublishDate'
                        value={bookForm.PublishDate}
                        onChange={handleFormChange}
                    />
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 mt-3" onClick={handleSubmit}>
                    SUBMIT
                </button>
            </div>
            <div className=' w-full mt-10'>
                <div className='w-full'>
                    <table className=' w-full bg-white divide-y divide-gray-300'>
                        <thead className=' bg-gray-300 shadow-2xl'>
                            <tr>
                                <th className=' tracking-wider px-6 py-6 text-left text-xs font-medium text-grey-500 uppercase'>Book Name</th>
                                <th className=' tracking-wider px-6 py-6 text-left text-xs font-medium text-grey-500 uppercase'>Book Title</th>
                                <th className=' tracking-wider px-6 py-6 text-left text-xs font-medium text-grey-500 uppercase'>Author</th>
                                <th className=' tracking-wider px-6 py-6 text-left text-xs font-medium text-grey-500 uppercase'>Selling Price</th>
                                <th className=' tracking-wider px-6 py-6 text-left text-xs font-medium text-grey-500 uppercase'>Publish Date</th>
                            </tr>
                        </thead>
                        <tbody className=' bg-white divide-y divide-gray-300'>
                            {
                                bookList?.map((book, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td className=' whitespace-nowrap px-6 py-6'>{book?.BookName}</td>
                                            <td className=' whitespace-nowrap px-6 py-6'>{book?.BookTitle}</td>
                                            <td className=' whitespace-nowrap px-6 py-6'>{book?.Author}</td>
                                            <td className=' whitespace-nowrap px-6 py-6'>{book?.SellingPrice}</td>
                                            <td className=' whitespace-nowrap px-6 py-6'>{book?.PublishDate}</td>
                                            <td className=' whitespace-nowrap px-6 py-6'>
                                                <div className=' w-20 flex justify-center gap-5'>
                                                    <div className=' h-8 w-8 flex justify-center items-center bg-red-100 text-red-600 rounded text-lg' onClick={() => handleDelete(book._id)}>
                                                        <span><MdDelete /></span>
                                                    </div>
                                                    <div className=' h-8 w-8 flex justify-center items-center bg-green-100 text-green-600 rounded text-lg' onClick={() => handleUpdate(book)}>
                                                        <span><FaPenNib /></span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>*/