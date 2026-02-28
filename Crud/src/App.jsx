import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Sever from "./page/Sever";

function App() {
  return (
    <>
     <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-400 ">

      <nav className="bg-gray-900/70 backdrop-blur-md text-white px-6 py-4 flex gap-6 shadow-md">

        <Link to="/home" className="hover:text-yellow-300 transition duration-200">
            Home
          </Link>

          
         <Link to="/add" className="hover:text-yellow-300">
         About
         </Link>

      </nav>


      <div className="p-6">
         <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/home" element={<Home />} />
        <Route path="/add" element={<About />} />
       <Route path="/sever/:id" element={<Sever />} />
        </Routes>

      </div>
      </div>
    </>
  );
}

export default App;
