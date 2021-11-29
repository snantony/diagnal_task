import React, { useEffect, useRef, useCallback } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectMovieList,
  selectPagesFetched,
  selectTotalItems,
} from "../../redux/contentList/contentList.selectors";
import { onFetchList } from "../../redux/contentList/contentList.actions";

import Movie from "../Movie/Movie.component";

import style from "./movieListContainer.module.css";

const MovieListContainer = (props) => {
  console.log('MovieListContainer',props);
  const { collection, pagesFetched, totalItems, getContentList, pageNo, setPageNo, query  } = props;

  useEffect(() => {
    getContentList({ pageNo, query, type:'scroll' });
  }, [pageNo, query, getContentList]);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && totalItems > pagesFetched) {
          setPageNo((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [pagesFetched, totalItems, setPageNo]
  );

  const renderList = () => {
    const refItemIndex = (collection.length * 3) / 4 - 1;
    return collection.map((item, index) => {
      if (refItemIndex === index) {
        return (
          <Movie
            ref={lastBookElementRef}
            imageUrl={`http://localhost:8080/images/${item["poster-image"]}`}
            title={item.name}
          />
        );
      }
      return (
        <Movie
          imageUrl={`http://localhost:8080/images/${item["poster-image"]}`}
          title={item.name}
        />
      );
    });
  };
  return <div className={style.mainContiner}>{renderList()}</div>;
};

const mapStateToProps = createStructuredSelector({
  collection: selectMovieList,
  pagesFetched: selectPagesFetched,
  totalItems: selectTotalItems,
});

const mapDispatchToProps = (dispatch) => ({
  getContentList: (config) => dispatch(onFetchList(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieListContainer);
