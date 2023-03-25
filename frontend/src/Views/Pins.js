import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { CreatePin, Feed, Navbar, PinDetail, Search } from "../Components/Index"

const Pins = ({ User }) => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={User && User} />
            </div>
            <div className="h-full">
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/Category/:categoryId" element={<Feed />} />
                    <Route path="/PinDetail/:pinId" element={<PinDetail user={User && User} />} />
                    <Route path="/CreatePin" element={<CreatePin user={User && User} />} />
                    <Route path="/Search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
                </Routes>
            </div>
        </div>
    )
}

export default Pins