import React from "react";
import LazyLoad from "react-lazyload";
import CardSkeleton from "../../components/Skeleton";

const CastList = (props: any) => {
  return (
    <div className="grid grid-cols-3 gap-3 mt-5 md:grid-cols-4 lg:grid-cols-6">
      {props.casts.map((cast: any, index: number) => (
        <LazyLoad key={cast.id} placeholder={<CardSkeleton />}>
          <div className="mb-5">
            <div
              className="bg-cover mb-2 h-[10rem]"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${cast.profile_path})`,
              }}
            ></div>
            <p>{cast.original_name}</p>
          </div>
        </LazyLoad>
      ))}
    </div>
  );
};

export default CastList;
