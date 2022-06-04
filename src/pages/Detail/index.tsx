import moment from "moment";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OutlineButton } from "../../components/Button/Button";
import Layout from "../../components/Layout/layout";
import { MovieService } from "../../services/Movie";
import { getTimeFromMins } from "../../utils";
import CastList from "./CastList";
import "./_index.scss";
const Detail = () => {
  const { id }: any = useParams();
  const [casts, setCasts] = React.useState([]);
  const [detail, setDetail] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [genres, setGenres] = React.useState("");
  const navigate = useNavigate();

  const getMovieDetail = async () => {
    try {
      let response: any = await MovieService.getMovieDetail(id, {});
      if (response) {
        // [{id: 14, name: "Fantasy"}, {id: 28, name: "Action"}, {id: 12, name: "Adventure"}] => Fantasy, Action, Adventure
        let genresString = response.genres
          .reduce(
            (acc: any, current: any) => acc.concat(`${current.name}, `),
            ""
          )
          .slice(0, -2);
        setGenres(genresString);
        setDetail(response);
        getCastList();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const getCastList = async () => {
    try {
      let response: any = await MovieService.getCastListById(id);
      if (response.cast) {
        setCasts(response.cast.slice(0, 6));
        setIsLoading(false);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  React.useEffect(() => {
    getMovieDetail();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 animate-pulse h-screen">
        <div className="w-8 h-8 bg-red-500 rounded-full animate-bounce"></div>
        <div className="w-8 h-8 bg-red-500 rounded-full animate-bounce"></div>
        <div className="w-8 h-8 bg-red-500 rounded-full animate-bounce"></div>
      </div>
    );
  }

  return (
    <Layout>
      {detail && (
        <div className="block">
          <div
            className="banner relative"
            style={{
              backgroundImage: detail.backdrop_path
                ? `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${detail.backdrop_path})`
                : `url(https://via.placeholder.com/1024x750)`,
            }}
          >
            <OutlineButton className="absolute top-4 left-5 lg:top-32" onClick={() => navigate(-1)}>Back</OutlineButton>
          </div>
          <div className="flex justify-start items-start relative mx-auto max-w-[1260px] -mt-[10rem] md:-mt-[15rem]">
            <div className="flex-1">
              <div
                className="bg-no-repeat bg-cover bg-center sm:h-[25rem] md:h-[35rem] rounded-[30px] ml-5"
                style={{
                  backgroundImage: detail.poster_path
                    ? `url(https://image.tmdb.org/t/p/original/${detail.poster_path})`
                    : `url(https://via.placeholder.com/358x560)`,
                }}
              ></div>
            </div>
            <div className="w-full sm:w-[70%] relative p-5 md:pl-12">
              <h1 className="font-bold text-[2rem] leading-snug text-white lg:text-[4rem] mb-5">
                {detail.original_title}
              </h1>
              <p className="mb-5 -mt-5">
                {moment(detail.release_date).format("DD/MM/YYYY")} | {genres} |{" "}
                {getTimeFromMins(detail.runtime)}
              </p>
              <p className="text-xs md:text-base font-extralight text-gray-300">
                {detail.overview}
              </p>
              <h2 className="font-bold mt-5">Top Billed Cast</h2>
              {casts.length > 0 && <CastList casts={casts} />}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default Detail;
