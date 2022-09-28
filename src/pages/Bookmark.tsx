import React, { useEffect, useContext } from 'react';
import data from "../data.json";
import {FaBookmark, FaRegBookmark, FaTv} from "react-icons/fa";
import {MdLocalMovies} from "react-icons/md";
import {MovieContext} from "../Contexts/MovieContext";

function Bookmark() {

    // @ts-ignore
    const { recommended } = useContext(MovieContext)

    interface movieInt {
        year: number,
        category: string,
        rating: string,
        isBookmarked: boolean,
        isTrending: boolean,
    }

    const [bookmarked, setBookmarked] = React.useState<movieInt[]>([]);

    useEffect(() => {
        getBookmarked();
    }, [])

    const getBookmarked = () => {
        setBookmarked(bookmarked.concat(recommended.filter((data : any) => data.isBookmarked)));
    }

    return(
        <div className="text-white col-span-7 sm:ml-0 ml-6">
            <h1 className="sm:text-3xl text-xl mt-16">Bookmarked Movies & Series</h1>
            <div className="w-full grid sm:grid-cols-4 grid-cols-2">
                {bookmarked.map((info : any, index) => {
                    return(
                        <div className="w-full mt-6 relative" key={index}>
                            <img className="rounded-lg sm:w-4/5 w-4/5 sm:h-40 h-24" src={info.thumbnail.regular.small} alt="recommended"/>
                            <div className="flex flex-row text-sm text-slate-400 mt-2 space-x-1">
                                {info.isBookmarked ? <FaBookmark className="absolute top-5 sm:left-72 left-24 text-white text-lg" /> :
                                    <FaRegBookmark className="absolute top-5 sm:left-72 left-24 text-white text-lg" />}
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
    );
}

export default Bookmark;