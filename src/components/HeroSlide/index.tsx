import React from "react";
import SlideShow from "../SlideShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import { Link } from "react-router-dom";



const HeroSlide = (props: any) => {
    const { movieSlide } = props;
    return ( 
    <div className="relative">
      <div className="md:hidden absolute z-50 text-white p-3 w-full">
        <div className="relative w-full">
          <input
            className="w-full h-10 px-5 bg-gray-700 opacity-70 text-sm text-white placeholder:text-white focus:outline-none"
            name="search"
            placeholder="Search...."
          />
          <img
            onClick={() => alert("hehehe")}
            src="/svg/search.svg"
            className="absolute right-0 top-0 mt-4 mr-2"
          />
        </div>
      </div>
      <SlideShow
        className="background-image mb-4 md:mb-24"
        slideToShow={1}
        speed={750}
        dots={false}
        infinite={false}
        autoplay={false}
      >
        {movieSlide.map((movie:any, index:Number) => (
          <div
            className="relative h-[30rem] md:h-[35rem] lg:h-[55rem] cursor-pointer"
            key={movie.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt="background"
              className="brightness-[0.3] h-full object-cover w-full mt-5"
            />
            <div className="blur-el"></div>
            <div className="absolute top-20 left-0 px-6 lg:top-40 lg:mx-20 flex">
              <div className="w-full md:w-[60%]">
                <h3 className="hidden md:flex bg-gradient-to-r w-2/4 h-10 from-[#ff3741] opacity-70 border-l-4 border-[#e50914] mb-10 px-4 items-center">
                  <span className="items-center text-xl font-bold text-white opacity-100">
                    NOW PLAYING
                  </span>
                </h3>
                <h4 className="uppercase font-semibold text-lg leading-none text-[3rem] text-white lg:text-[4.5rem]">
                  {movie.original_title}
                </h4>
                <p className="block lg:mb-9 my-2 leading-normal font-normal text-gray-100">
                  <FontAwesomeIcon color="red" icon={faStar} /> {movie.vote_average} | {moment(movie.release_date).format("DD/MM/YYYY")}
                </p>
                <p className="block my-5 text-gray-50 font-bold text-sm md:mb-5 md:text-base w-full lg:w-5/6">
                  {movie.overview}
                </p>
                <Link
                  to={`movie/${movie.id}`}
                  className="bg-red-700 rounded-[15px] font-medium font-monsterrat text-white px-2 py-3.5 leading-10 tracking-widest transition duration-300 ease-in-out hover:bg-red-800 mr-6"
                >
                  <FontAwesomeIcon icon={faPlay} className="mx-2" />
                  PLAY NOW
                </Link>
              </div>
              <div className="hidden md:flex md:flex-1 relative -top-5">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="h-[30rem] lg:h-[40rem] rounded-[30px]"/>
              </div>
            </div>
          </div>
        ))}
      </SlideShow>
    </div>
  );
};

export default HeroSlide;
