import React from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

interface IMovieProps {
  id: Number | any,
  original_title: string,
  poster_path: String,
  backdrop_path: String
}

const MovieCard = (props: IMovieProps) => {
  const link = `/movie/${props.id}`;

  return (
    <Link to={link} key={props.id}>
      <div className="group group-hover:cursor-pointer relative">
        <LazyLoad>
          <img
            alt={props.original_title}
            src={props.poster_path ? `https://image.tmdb.org/t/p/original/${props.poster_path}` : `https://via.placeholder.com/358x560` }
            className="rounded-[15px] group-hover:opacity-50 transition-all duration-100 delay-75"
            loading="lazy"
          />
        </LazyLoad>
        <h3 className="leading-7 font-semibold mt-5 group-hover:text-red-500">
          {props.original_title}
        </h3>
      </div>
    </Link>
  );
};

export default MovieCard;
