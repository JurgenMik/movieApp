import React from 'react';
import { Outlet, Link} from 'react-router-dom';
import {RiClapperboardFill, RiBookmarkFill} from 'react-icons/ri';
import {FaMicrosoft, FaTv } from 'react-icons/fa';
import {MdLocalMovies} from 'react-icons/md';

function Layout() {
    return(
        <div className="w-full min-h-screen grid grid-cols-8 bg-slate-900">
            <nav className="sm:w-1/3 w-full max-h-screen ml-auto mr-auto flex flex-col items-center bg-slate-800 sm:mt-6 sm:mb-6 sm:rounded-xl">
                <div className="text-4xl text-red-800 mt-6">
                    <RiClapperboardFill />
                </div>
                <ul className="space-y-16 text-2xl sm:mt-16 mt-28 text-slate-500">
                    <li>
                        <Link className="hover:text-white" to="/">
                            <FaMicrosoft />
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-white" to="/movies">
                            <MdLocalMovies />
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-white" to="/series">
                            <FaTv/>
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-white" to="/bookmarked">
                            <RiBookmarkFill />
                        </Link>
                    </li>
                </ul>
                <div className="w-full h-1/2 flex justify-center items-end mb-10">
                    <img
                        className="h-10 w-10 rounded-full ring-2 ring-slate-500"
                        src={"assets/image-avatar.png"}
                        alt="profile"
                    />
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;