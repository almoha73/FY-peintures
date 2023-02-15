import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../firebase";
import { getGallerie } from "../services/fetchDatas";
import { solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import { doc, setDoc } from "firebase/firestore";
import uuid from "react-uuid";
const Gallery = () => {
  const [gallerie, setGallerie] = useState([]);
  const [likes, setLikes] = useState({});
  const [isLiked, setIsLiked] = useState({});

  const totalLikes =  Object.values(likes).reduce((acc, value) => acc + value, 0) 


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

  console.log(gallerie, likes);

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
      const newLikes = {
        ...prevLikes,
        [id]: isLiked[id] ? (prevLikes[id] || 0) - 1 : (prevLikes[id] || 0) + 1,
      };
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
    <div className="w-full h-auto  bg-yellow-50 flex flex-col items-center justify-center">
      <Navbar />
      <div className="flex sm:my-8 mb-8 mt-4">
      <span className="font-dancing text-2xl">Compteur de Likes : </span><span className="ml-4 text-2xl font bold">{totalLikes}</span>
      </div>
      
      <main className=" flex-1 w-11/12 h-auto  sm:columns-1 md:columns-3 xl:columns-4 sm:gap-4 2xl:gap-6 box17 sm:mt-8 sm:mb-16 p-4 space-y-4">
        {gallerie?.length > 0 &&
          gallerie?.map((elt) => (
            <figure
              className="w-full rounded  sm:w-[500px] md:w-auto sm:mx-auto shadow shadow-lg px-2 pt-2 bg-orange-100 "
              key={uuid()}
            >
              <img
                src={elt.gallerie.href}
                alt={elt.gallerie.name}
                className="w-full rounded sm:aspect-video sm:object-contain shadow shadow-lg"
              />

              <figcaption
                className=" w-11/12 mx-auto h-8 flex items-center justify-between"
                key={uuid()}
              >
                <div>
                <FontAwesomeIcon
                  icon={isLiked[elt.key] ? solid("heart") : solid("heart")}
                  className={
                    isLiked[elt.key]
                      ? "text-xl cursor-pointer mr-4 text-red-500"
                      : "text-xl cursor-pointer mr-4 text-orange-500"
                  }
                  
                  onClick={() => handleLike(elt.key)}
                />
                <span>{likes[elt.key] || 0}</span>
                </div>
                <span>{elt.gallerie.name}</span>
                
              </figcaption>
            </figure>
          ))}
      </main>
      <Footer/>
    </div>
  );
};

export default Gallery;
