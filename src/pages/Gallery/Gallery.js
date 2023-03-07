import React, { useState, useEffect } from "react";
import "./Gallery.css";
import { db } from "../../firebase";
import { getGallerie } from "../../services/fetchDatas";
import { doc, setDoc } from "firebase/firestore";
import uuid from "react-uuid";
import "react-lazy-load-image-component/src/effects/blur.css";
import Spinner from "../Spinner/Spinner";
import InputSelect from "../../components/InputSelect";
import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid} from "@fortawesome/fontawesome-svg-core/import.macro";


const Gallery = () => {
  const [gallerie, setGallerie] = useState([]);
  const [likes, setLikes] = useState({});
  const [isLiked, setIsLiked] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("Popularité décroissante");
  const [showScroll, setShowScroll] = useState(false);
  const totalLikes = Object.values(likes).reduce(
    (acc, value) => acc + value,
    0
  );

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
  }, []);

  useEffect(() => {
    const loadLikes = async () => {
      setIsLoading(true);
      const data = await getGallerie();
      const newLikes = {};
      await data.forEach((query) => {
        const id = query.id;
        const likes = query.data().likes;
        newLikes[id] = likes;
      });
      setLikes(newLikes);
      setIsLoading(false);
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

  const sortGallerie = (gallerie, sortBy) => {
    switch (sortBy) {
      case "Tri par nom ↑":
        return gallerie.sort((a, b) =>
          a.gallerie.name
            .toLowerCase()
            .localeCompare(b.gallerie.name.toLowerCase())
        );
      case "Tri par nom ↓":
        return gallerie.sort((a, b) =>
          b.gallerie.name
            .toLowerCase()
            .localeCompare(a.gallerie.name.toLowerCase())
        );
      case "Popularité croissante":
        return gallerie.sort((a, b) => a.gallerie.likes - b.gallerie.likes);

      case "Popularité décroissante":
        return gallerie.sort((a, b) => b.gallerie.likes - a.gallerie.likes);
      default:
        return gallerie;
    }
  };

  const options = [
    { option: "Popularité décroissante", id: uuid() },
    { option: "Popularité croissante", id: uuid() },
    { option: "Tri par nom ↓", id: uuid() },
    { option: "Tri par nom ↑", id: uuid() },
  ];

  console.log(gallerie);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 200){
      setShowScroll(false)
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });
  return (
    <>
      {isLoading && <Spinner />}
      <div className="w-full sm:h-auto h-auto  bg-yellow-50 flex flex-col items-center justify-center">
        <div className="flex sm:my-8 mb-8 mt-4 text-orange-900">
          <span className="font-dancing text-2xl ">Compteur de Likes : </span>
          <span className="ml-4 text-2xl font bold">{totalLikes}</span>
        </div>
        <div className="flex justify-center items-center mb-4">
          <InputSelect
            options={options}
            selectedOption={sortBy}
            onSelect={setSortBy}
          />
        </div>
        <main className="gallery">
          {gallerie?.length > 0 &&
            sortGallerie(gallerie, sortBy)?.map((elt) => (
              <Card
                key={uuid()}
                imageUrl={elt.gallerie.href}
                imageAlt={elt.gallerie.name}
                likesCount={likes[elt.key] || 0}
                isLiked={isLiked[elt.key]}
                onLike={() => handleLike(elt.key)}
              />
            ))}
        </main>
        <div
          className="scrollTop"
          onClick={scrollTop}
          style={{
            display: showScroll ? "flex" : "none",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "999",
          }}
        >
          <FontAwesomeIcon icon={solid("arrow-up")} className="text-orange-500 h-8" />
        </div>
      </div>
    </>
  );
};

export default Gallery;
