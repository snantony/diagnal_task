import React, {useState} from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectTitle } from "../../redux/contentList/contentList.selectors";

import { onSearch } from "../../redux/contentList/contentList.actions";

import searchIcon from "../../assets/images/search.png";
import backIcon from "../../assets/images/Back.png";

import style from "./headerSection.module.css";

const HeaderSection = (props) => {
    console.log(props);
  const { title, onSearch, query, setQuery, setPageNo } = props;
  const [toogleSearch,setToogleSearch] = useState(false);
  const handelToogle = ()=>{
    setToogleSearch(state=>!state);
  }
  const handelOnChage = e => {
      const {value} = e.target;
      setQuery(value);
      setPageNo(1);
      onSearch({ pageNo:1, query: value, type:'search' });
  }
  return (
    <div className={style.headerContainer}>
      <button type="button"><img src={backIcon} alt="back icon" /></button>
      {
          toogleSearch?<input type="text" value={query} onChange={e=>handelOnChage(e)} />:<h1>{title}</h1>
      }
      <button type="button" onClick={handelToogle} className={style.shiftRight}><img src={searchIcon} alt="search icon" /></button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  title: selectTitle,
});

const mapDispatchToProps = (dispatch) => ({
    onSearch: (config) => dispatch(onSearch(config)),
});

export default connect(mapStateToProps,mapDispatchToProps)(HeaderSection);
