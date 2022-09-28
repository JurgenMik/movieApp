import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Bookmark from "./pages/Bookmark";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Layout from "./pages/Layout";
import { MovieContext } from "./Contexts/MovieContext";

function App() {

    interface movieInt {
        year: number,
        category: string,
        rating: string,
        isBookmarked: boolean,
        isTrending: boolean,
        title: string,
    }

    const [recommended, setRecommended] = React.useState<movieInt[]>([]);

  return (
      <MovieContext.Provider value={{ recommended, setRecommended }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="bookmarked" element={<Bookmark />} />
            <Route path="movies" element={<Movies />} />
            <Route path="series" element={<Series />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </MovieContext.Provider>
  );
}

export default App;
