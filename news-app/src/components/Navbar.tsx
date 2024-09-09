// src/components/Navbar.tsx
"use client"

import Link from 'next/link';
import { useState } from 'react';
//import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';


const Navbar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  return (
    <nav className=" fixed w-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 p-4 ">
      <div className="container mx-auto flex justify-between items-center ">
      <Image src= "/nytpng.png" alt="Logo" width= {400} height={100} className="px-10 object-scale-down  " />
      
        <div className="space-x-4">
          <Link href="/" className=  {pathname === "/" ? "text-white font-bold" : "text-white" }>Home</Link>
          <Link href="/automobiles" className=  {pathname === "/automobiles" ? "text-white font-bold" : "text-white" }>Automobiles</Link>
          <Link href="/technology" className=  {pathname === "/technology" ? "text-white font-bold" : "text-white" }>Technology</Link>
        </div>
        <form onSubmit={handleSearch} className="flex ml-auto">
          <input
            type="text"
            placeholder="Search news..."
            className="px-4 py-2 rounded-l-md text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-br from-orange-500 via-orange-300 to-orange-300 text-white px-4 py-2 rounded-r-md"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
