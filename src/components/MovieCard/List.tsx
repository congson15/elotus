import React from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import moment from 'moment';

interface IMovieProps {
  id: Number | any;
  original_title: string;
  poster_path: String;
  overview:String,
  release_date:any,
  backdrop_path: String;
}

const MovieCardList = (props: IMovieProps) => {
  const link = `/movie/${props.id}`;

  return (
    <Link to={link} key={props.id}>
      <div className="group group-hover:cursor-pointer relative flex mb-10 lg:mb-5 flex-col items-center md:flex-row">
        <LazyLoad>
          <img
            alt={props.original_title}
            src={
              props.poster_path
                ? `https://image.tmdb.org/t/p/original/${props.poster_path}`
                : `https://via.placeholder.com/358x560`
            }
            className="rounded-[15px] w-11/12 mx-5 md:min-w-[28rem] xl:h-[25rem] transform transition duration-500 group-hover:scale-110"
          />
        </LazyLoad>
        <div className="ml-10 transform transition duration-500 group-hover:scale-y-125">
          <h3 className="leading-7 font-semibold my-5 text-3xl xl:text-[2.5rem] group-hover:text-red-500">
            {props.original_title}
          </h3>
          <p className="mb-5 leading-7">{moment(props.release_date).format("DD/MM/YYYY")}</p>
          <p className="leading-7">{props.overview}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCardList;
