import React, { Fragment } from "react";
import LazyLoad from "react-lazyload";
import Layout from "../../components/Layout/layout";
import MovieCard from "../../components/MovieCard";
import CardSkeleton from "../../components/Skeleton";
import "./_index.scss";
import { OutlineButton } from "../../components/Button/Button";
import { CommonService } from "../../services/Common";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTableCells } from "@fortawesome/free-solid-svg-icons";
import MovieCardList from "../../components/MovieCard/List";
import SkeletonList from "../../components/Skeleton/SkeletonList";

const viewTypeList = [
  {
    type: "list_view",
    name: faList,
  },
  {
    type: "grid_view",
    name: faTableCells,
  },
];

const SearchPage = () => {
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(true);
  const [totalPage, setTotalPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [viewType, setViewType] = React.useState("grid_view");
  const [isReload, setIsReload] = React.useState(false);
  const location = useLocation();
  const state: any = location.state;

  React.useEffect(() => {
    getMovies();
  }, []);
  React.useEffect(() => {
    getMovies();
  }, [isReload]);

  const getMovies = async () => {
    setLoading(true);
    const params = { pages: 1, query: state.keyword };
    try {
      const response: any = await CommonService.searchByKeyword(params);
      if (response.results) {
        setMovies(response.results);
        setLoading(false);
        setTotalPage(response.total_pages);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleLoadMore = async () => {
    try {
      const params = {
        page: currentPage + 1,
        query: state.keyword,
      };
      let response: any = await CommonService.searchByKeyword(params);
      if (response.results) {
        const results: never[] = response.results;
        setMovies([...movies, ...results]);
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const renderMovieList = () => {
    if (movies.length === 0) {
      return <h3 className="text-center">No results</h3>;
    }
    if (viewType === "grid_view") {
      return (
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
          {currentPage < totalPage && (
            <OutlineButton
              className="flex my-0 mx-auto mb-20"
              onClick={handleLoadMore}
            >
              Load more
            </OutlineButton>
          )}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className="grid grid-cols-1 gap-4 lg:mx-20">
          {movies.map((movie: any, index) => (
            <LazyLoad key={movie.id} placeholder={<CardSkeleton />}>
              <MovieCardList
                id={movie.id}
                backdrop_path={movie.backdrop_path}
                original_title={movie.original_title}
                poster_path={movie.poster_path}
                overview={movie.overview}
                release_date={movie.release_date}
              />
            </LazyLoad>
          ))}
        </div>
        {currentPage < totalPage && (
          <OutlineButton
            className="flex my-0 mx-auto mb-20"
            onClick={handleLoadMore}
          >
            Load more
          </OutlineButton>
        )}
      </Fragment>
    );
  };

  const renderSkeleton = () => {
    if (viewType === "grid_view") {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12 mx-4 lg:mx-20">
          {Array.from(Array(50), (x, index) => index + 1).map((index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-4 mb-12 mx-4 lg:mx-20">
        {Array.from(Array(50), (x, index) => index + 1).map((index) => (
          <SkeletonList key={index} />
        ))}
      </div>
    );
  };

  const handleViewTypeChange = (type: any) => {
    if (type === viewType) {
      return;
    }
    setViewType(type);
  };

  return (
    <Layout isReload={isReload} setIsReload={setIsReload}>
      <div className="flex justify-between mb-10 mt-20 mx-5 md:mx-20 items-center">
        <div className="flex flex-col">
          <OutlineButton
            className="border-none my-5"
            onClick={() => navigate("/")}
          >
            Home
          </OutlineButton>
          <h3 className="text-gray-300">
            Search Keyword:{" "}
            <span className="font-bold text-gray-50">{state.keyword}</span>
          </h3>
        </div>
        <div className="rounded-lg">
          {viewTypeList.map((type: any, index: number) => (
            <div className="inline-flex rounded-lg" key={index}>
              <input
                type="radio"
                name="view_type"
                onClick={(e: any) => handleViewTypeChange(e.target.id)}
                id={type.type}
                hidden
              />
              <label
                htmlFor={type.type}
                className="radio text-center self-center py-2 px-4 rounded-lg cursor-pointer hover:opacity-75"
              >
                <FontAwesomeIcon icon={type.name} />
              </label>
            </div>
          ))}
        </div>
      </div>
      {isLoading && renderSkeleton()}
      {!isLoading && renderMovieList()}
    </Layout>
  );
};

export default SearchPage;
