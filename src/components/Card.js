import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Card = ({ imageUrl, imageAlt, likesCount, isLiked, onLike }) => {
  return (
    <div className="">
      <div className="figure flex flex-col relative w-[300px] h-[400px] overflow-hidden bg-orange-100 ">
        <LazyLoadImage
          src={imageUrl}
          alt={imageAlt}
          className=" w-full  sm:w-80 mb-8 image"
        />

        <div className="figcaption bg-orange-100 flex justify-between w-full p-1 h-8 absolute bottom-0">
          <div className=" p-1 h-6 ">
            <FontAwesomeIcon
              icon={isLiked ? solid("heart") : solid("heart")}
              className={
                isLiked
                  ? `text-xl cursor-pointer mr-4 text-red-500`
                  : `text-orange-500 cursor-pointer mr-4 `
              }
              onClick={onLike}
            />
            <span>{likesCount}</span>
          </div>
          <span className="">{imageAlt}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
