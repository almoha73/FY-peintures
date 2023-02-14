import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../firebase";
import { getGallerie } from "../services/fetchDatas";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { doc, setDoc } from "firebase/firestore";
import uuid from "react-uuid";
const Gallery = () => {
  const [gallerie, setGallerie] = useState([]);
  const [likes, setLikes] = useState();
  const [isLiked, setIsLiked] = useState({});

  useEffect(() => {
    const array = [];
    const loadData = async () => {
      const data = await getGallerie();
      await data.forEach((query) => {
        array.push({ key: query.id, gallerie: query.data() });
      });

      setGallerie(array);
    };
    loadData();
  }, [gallerie.length]);

  console.log(gallerie);

  useEffect(() => {
    const loadLikes = async () => {
      const data = await getGallerie();
      const newLikes = {};
      await data.forEach((query) => {
        const id = query.id;
        const likes = query.data().likes;
        newLikes[id] = likes;
      });
      setLikes(newLikes);
    };
    loadLikes();
  }, []);

  const handleLike = (id) => {
    setLikes((prevLikes) => {
      const newLikes = { ...prevLikes, [id]: isLiked[id] ? (prevLikes[id] || 0) - 1 : (prevLikes[id] || 0) + 1 };
      const Ref = doc(db, "gallerie", id);
      console.log(Ref);
      setDoc(
        Ref,
        {
          likes: newLikes[id],
        },
        { merge: true }
      );
      setIsLiked({ ...isLiked, [id]: !isLiked[id] });
      return newLikes;
    });
  };

  return (
    <div className="w-full h-auto  bg-yellow-50 flex flex-col items-center">
      <Navbar />
      <main className="w-10/12 sm:columns-2 lg:columns-3 xl:columns-4 sm:gap-8 box17 p-4 my-16">
        {gallerie?.length > 0  && (gallerie?.map((elt) => (
          <div key={uuid()} className="w-full h-fit sm:w-80 mb-8 border border-4 rounded-lg shadow-md shadow-white">
            <img
            key={uuid()}
              src={elt.gallerie.href}
              alt=""
              className="w-full rounded shadow shadow-lg block"
            />
            <div className=" w-full h-8 flex items-center" key={uuid()}>
              <FontAwesomeIcon
                icon={isLiked[elt.key] ? solid("heart") : regular("heart")}
                className=" text-xl cursor-pointer mx-4"
                onClick={() => handleLike(elt.key)}
              />
              <span>{likes[elt.key] || 0}</span>
            </div>
          </div>
        )))}
      </main>
    </div>
  );
};

export default Gallery;
