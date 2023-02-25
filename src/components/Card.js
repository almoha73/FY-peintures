import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Card = ({ imageUrl, imageAlt, likesCount, isLiked, onLike }) => {
  return (
    <figure className=" bg-orange-100 flex flex-col w-full h-auto">
      <LazyLoadImage
        src={imageUrl}
        alt={imageAlt}
        effect="blur"
        className="object-contain w-full h-[270px] p-2 block "
      />

      <figcaption className="bg-orange-100">
        <div>
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
        <span>{imageAlt}</span>
      </figcaption>
    </figure>
  );
};

export default Card;
