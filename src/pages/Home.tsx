import React, { useEffect } from 'react';
import { FaSearch, FaTv, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import {MdLocalMovies} from 'react-icons/md';
import data from '../data.json';

function Home() {

    interface movieInt {
        year: number,
        category: string,
        rating: string,
        isBookmarked: boolean,
        isTrending: boolean,
    }

    const [trending, setTrending] = React.useState<movieInt[]>([]);

    useEffect(() => {
       getTrendingMovies();
    },[]);

    const getTrendingMovies = () => {
       setTrending(trending.concat(data.filter(trendingMovies)));
    }

    const trendingMovies = (data : movieInt) => {
        return data.isTrending;
    }

    return(
        <div className="col-span-5 ml-6 mt-10">
            <div className="sm:w-1/2 w-full flex justify-center items-center text-white">
                <FaSearch className="text-2xl sm:mr-4 mr-2" />
                <input
                    className="w-full p-4 bg-slate-900 sm:text-2xl text-md"
                    placeholder="Search for movies or TV series"
                />
            </div>
            <div className="w-full mt-6">
                <h1 className="sm:text-2xl text-xl text-white">Trending</h1>
                <div className="w-full flex flex-row space-x-8 mt-6">
                    {trending.map((info : any, index) => {
                        return(
                            <div className="w-72 flex-shrink-0 relative" key={index}>
                                <img className="rounded-lg" src={info.thumbnail.trending.small} alt="thumbnail" />
                                <div className="flex flex-row absolute top-28 text-sm text-slate-400 space-x-2 ml-4">
                                    {info.isBookmarked ? <FaBookmark className="absolute left-56 bottom-24 text-white text-lg" /> :
                                        <FaRegBookmark className="absolute bottom-24 left-56 text-white text-lg" />}
                                    <h1>
                                        {info.year}
                                    </h1>
                                    <h1>{info.category === 'Movie' ? <MdLocalMovies className="text-white text-lg" /> :
                                        <FaTv className="text-white text-lg" />}</h1>
                                    <h1>
                                        {info.rating}
                                    </h1>
                                </div>
                                <div className="absolute top-32 text-white text-xl font-bold ml-4">
                                    <h1>
                                        {info.title}
                                    </h1>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;