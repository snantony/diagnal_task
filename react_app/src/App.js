import React, { useState } from "react";

import MovieListContainer from "./components/MovieListContainer/MovieListContainer";
// import HeaderSection from "./components/HeaderSection/HeaderSection.component";

import style from "./App.module.css";

const App = (props) => {
  const [pageNo, setPageNo] = useState(1);
  const [query, setQuery] = useState("test");

  return (
    <div>
      <MovieListContainer pageNo={pageNo} setPageNo={setPageNo} query={query} />
    </div>
  );
};

export default App;
