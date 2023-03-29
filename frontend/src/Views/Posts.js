import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { CreatePost, Feed, Navbar, PostDetail, Search } from "../Components/Index"

const Posts = ({ User }) => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className="px-2 md:px-5 dark:bg-[#1c1c24] transition-all duration-500">
            <div className="bg-gray-50">
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} User={User && User} />
            </div>
            <div className="h-full">
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/Category/:CategoryID" element={<Feed />} />
                    <Route path="/PostDetail/:PostID" element={<PostDetail User={User && User} />} />
                    <Route path="/CreatePost" element={<CreatePost User={User && User} />} />
                    <Route path="/Search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
                </Routes>
            </div>
        </div>
    )
}

export default Posts