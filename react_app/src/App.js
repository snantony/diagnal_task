import React, { useState } from "react";

import MovieListContainer from "./components/MovieListContainer/MovieListContainer";
import HeaderSection from "./components/HeaderSection/HeaderSection.component";

import style from "./App.module.css";

const App = (props) => {
  const [pageNo, setPageNo] = useState(1);
  const [query, setQuery] = useState("");

  return (
    <div>
      <HeaderSection query={query} setQuery={setQuery} setPageNo={setPageNo} />
      <MovieListContainer pageNo={pageNo} setPageNo={setPageNo} query={query} />
    </div>
  );
};

export default App;
