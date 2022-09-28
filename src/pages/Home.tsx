import React, {useEffect, useMemo, useContext} from 'react';
import { FaSearch, FaTv, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import {MdLocalMovies} from 'react-icons/md';
import data from '../data.json';
import {MovieContext} from "../Contexts/MovieContext";

function Home() {

    // @ts-ignore
    const { recommended, setRecommended, trending, setTrending, search, setSearch } = useContext(MovieContext);

    interface movieInt {
        year: number,
        category: string,
        rating: string,
        isBookmarked: boolean,
        isTrending: boolean,
        title: string,
    }

    useEffect(() => {
       getTrendingMovies();
       getRecommended();
    },[]);

    const getRecommended = () => {
        setRecommended(recommended.concat(data.filter(notTrendingMovies)));
    }

    const notTrendingMovies = (data : movieInt) => {
        return !data.isTrending;
    }

    const getTrendingMovies = () => {
       setTrending(trending.concat(data.filter(trendingMovies)));
    }

    const trendingMovies = (data : movieInt) => {
        return data.isTrending;
    }

    const getSearchResult = () => {
        if (search) {
            return data.filter(data => data.title.includes(search));
        }
        return recommended;
    }

    let searched = useMemo(getSearchResult, [recommended, search]);

    const handleBookmarks = (e : React.MouseEvent, info : movieInt) => {
        if (!info.isBookmarked) {
            setRecommended(recommended.filter((movies : any ) => movies.title !== info.title).concat({...info, isBookmarked : true}));
        } else {
            setRecommended(recommended.filter((movies : any ) => movies.title !== info.title).concat({...info, isBookmarked : false}))
        }
    }

    return(
        <div className="col-span-7 sm:ml-0 ml-6 mt-10">
            <div className="sm:w-1/2 w-full flex justify-center items-center text-white">
                <FaSearch className="text-2xl sm:mr-4 mr-2" />
                <input
                    className="w-full p-4 bg-slate-900 sm:text-2xl text-md"
                    placeholder="Search for movies or TV series"
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="w-full mt-6">
                <h1 className="sm:text-3xl text-2xl text-white">Trending</h1>
                <div className="w-full flex flex-row space-x-10 mt-6">
                    {trending.map((info : any, index : number) => {
                        return(
                            <div className="w-72 flex-shrink-0 relative" key={index}>
                                <img className="rounded-lg" src={info.thumbnail.regular.large} alt="thumbnail" />
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
                <div className="w-full mt-10">
                    {!search ? <h1 className="text-white sm:text-3xl text-2xl">Recommended for you</h1> :
                        <h1 className="text-white sm:text-3xl text-xl">Found {searched.length} Results for '{search}'</h1>}
                    <div className="w-full grid sm:grid-cols-4 grid-cols-2">
                        {searched.map((info : any, index : number) => {
                            return(
                                <div className="w-full mt-10 relative" key={index}>
                                    <img className="rounded-lg sm:w-4/5 w-4/5 sm:h-40 h-24" src={info.thumbnail.regular.small} alt="recommended"/>
                                    <div className="flex flex-row text-sm text-slate-400 mt-2 space-x-1">
                                        {info.isBookmarked ? <FaBookmark onClick={e => handleBookmarks(e, info)} className="absolute top-5 sm:left-72 left-24 text-white text-lg" /> :
                                            <FaRegBookmark onClick={e => handleBookmarks(e, info)} className="absolute top-5 sm:left-72 left-24 text-white text-lg" />}
                                        <h1>
                                            {info.year}
                                        </h1>
                                        <h1>{info.category === 'Movie' ? <MdLocalMovies className="text-white text-lg" /> :
                                            <FaTv className="text-white text-lg" />}</h1>
                                        <h1>
                                            {info.rating}
                                        </h1>
                                    </div>
                                    <h1 className="text-white text-md font-bold">
                                        {info.title}
                                    </h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;