import React from 'react';

import style from './movie.module.css';

const Movie = props => {
    return (
        <div className={style.movieContainer}>
            <img src={props.imageUrl} alt="poster2"/>
            <label>{props.title}</label>
        </div>
    );
}

export default Movie;