import React, { Fragment } from "react";
import HeroSlide from "../../components/HeroSlide";
import LazyLoad from "react-lazyload";
import Layout from "../../components/Layout/layout";
import MovieCard from "../../components/MovieCard";
import CardSkeleton from "../../components/Skeleton";
import { MovieService } from "../../services/Movie";
import "./_index.scss";
import { OutlineButton } from "../../components/Button/Button";

const movieTypeList = [
  {
    type: "now_playing",
    name: "Now Playing",
  },
  {
    type: "top_rated",
    name: "Top rated",
  },
];

const HomePage = () => {
  const [movies, setMovies] = React.useState([]);
  const [movieSlide, setMovieSlide] = React.useState([] as any);
  const [isLoading, setLoading] = React.useState(true);
  const [movieType, setMovieType] = React.useState("now_playing");
  const [totalPage, setTotalPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const getMovies = async (type: string) => {
    setLoading(true);
    const params = { pages: 1 };
    try {
      const response: any = await MovieService.getMovieList(type, params);
      if (response.results) {
        setMovies(response.results);
        setMovieSlide(response.results?.slice(1, 7));
        setLoading(false);
        setTotalPage(response.total_pages);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleLoadMore = async () => {
    try {
        const params ={
            page: currentPage+1
        }
        let response:any = await MovieService.getMovieList(movieType, params);
        if(response.results){
            const results : never[] = response.results;
            setMovies([...movies, ...results]);
            setCurrentPage(currentPage+1);
        }
    } catch (error) {
      alert("Something went wrong");
    }
  }

  const handleTabChange = (type: string) => {
    if (type === movieType) {
      return;
    }
    getMovies(type);
    setMovieType(type);
  };

  React.useEffect(() => {
    getMovies("now_playing");
  }, []);

  return (
    <Layout>
      {!isLoading && movieSlide.length > 0 && <HeroSlide movieSlide={movieSlide} />}
      <div className="flex justify-center items-center mb-10 mt-20">
        <div className="rounded-lg">
          {movieTypeList.map((type: any, index: number) => (
            <div className="inline-flex rounded-lg" key={index}>
              <input
                type="radio"
                name="movie_type"
                id={type.type}
                onClick={(e: any) => handleTabChange(e.target.id)}
                defaultChecked={movieType === type.type}
                hidden
              />
              <label
                htmlFor={type.type}
                className="radio text-center self-center py-2 px-4 rounded-lg cursor-pointer hover:opacity-75"
              >
                {type.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12 mx-4 lg:mx-20">
          {Array.from(Array(50), (x, index) => index + 1).map((index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      )}
      {!isLoading && movies.length > 0 && (
        <Fragment>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12 mx-4 lg:mx-20">
            {movies.map((movie: any, index) => (
              <LazyLoad key={movie.id} placeholder={<CardSkeleton />}>
                <MovieCard
                  id={movie.id}
                  backdrop_path={movie.backdrop_path}
                  original_title={movie.original_title}
                  poster_path={movie.poster_path}
                />
              </LazyLoad>
            ))}
          </div>
          {currentPage < totalPage && <OutlineButton className="flex my-0 mx-auto mb-20" onClick={handleLoadMore}>Load more</OutlineButton>}
        </Fragment>
      )}
    </Layout>
  );
};

export default HomePage;
