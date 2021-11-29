import React,{useState} from "react";

import image from '../../assets/images/placeholder_for_missing_posters.png'; 

import style from "./movie.module.css";

const Movie = React.forwardRef((props, ref) => {
    const {title,imageUrl} = props;
    const [src,setSrc] = useState(imageUrl);
  return (
    <div ref={ref} className={style.movieContainer}>
      <img
        src={src}
        alt={title}
        onError={(e) => {
            e.target.onerror = null;
            setSrc(image);
        }}
      />
      <label>{title}</label>
    </div>
  );
});

export default Movie;
