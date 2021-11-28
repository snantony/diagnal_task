import React, {useEffect} from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectMovieList } from "./redux/contentList/contentList.selectors";
import { onFetchList } from './redux/contentList/contentList.actions';

import Movie from "./components/Movie.component/Movie.component";

import style from "./App.module.css";

const App = (props) => {
  console.log(props);
  const { collection, getContentList } = props;
  useEffect(()=>{
    getContentList({pageNo:1});
  });
  return (
    <div className={style.mainContiner}>
      {collection.movieList.map((item) => {
        return (
          <Movie
            imageUrl={`http://localhost:8080/images/${item["poster-image"]}`}
            title={item.name}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collection: selectMovieList,
});

const mapDispatchToProps = dispatch => ({
  getContentList: (config) => dispatch(onFetchList(config))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
