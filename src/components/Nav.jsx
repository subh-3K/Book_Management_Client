import React from 'react'

function Nav() {
  return (
   <div className="flex w-full justify-between h-20 items-center bg-white shadow-lg px-8">
  {/* Logo Section */}
  <div className="flex items-center h-full">
    <h1 className="text-2xl font-extrabold text-gray-800">BookStore</h1>
  </div>

  {/* Navigation Links */}
  <div className="hidden md:flex w-auto">
    <ul className="flex gap-8 items-center font-semibold text-gray-700">
      <li className="hover:text-blue-600 cursor-pointer transition duration-300">Home</li>
      <li className="hover:text-blue-600 cursor-pointer transition duration-300">About</li>
      <li className="hover:text-blue-600 cursor-pointer transition duration-300">Contact</li>
    </ul>
  </div>
</div>
  )
}

export default Nav
