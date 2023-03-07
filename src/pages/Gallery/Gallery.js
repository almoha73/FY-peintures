/**
Page de galerie.
@module Gallery
*/

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
  /**
 * State hook for gallery images.
 * @type {[Object[], function]} An array containing the current state value of gallery and a function to update it.
 */
  const [gallerie, setGallerie] = useState([]);
  /**
 * State hook for likes on gallery images.
 * @type {[Object, function]} An object containing the current state value of likes and a function to update it.
 */
  const [likes, setLikes] = useState({});
  /**
 * State hook for checking if a user has liked a specific image in the gallery.
 * @type {[Object, function]} An object containing the current state value of isLiked and a function to update it.
 */
  const [isLiked, setIsLiked] = useState({});
  /**
 * State hook for loading status of gallery images.
 * @type {[boolean, function]} A boolean value representing the current loading state of the gallery and a function to update it.
 */
  const [isLoading, setIsLoading] = useState(false);
  /**
 * State hook for sorting method of gallery images.
 * @type {[string, function]} A string value representing the current sorting method for the gallery and a function to update it.
 */
  const [sortBy, setSortBy] = useState("Popularité décroissante");
  /**
 * State hook for determining if scroll bar is visible.
 * @type {[boolean, function]} A boolean value representing the current visibility status of the scroll bar and a function to update it.
 */
  const [showScroll, setShowScroll] = useState(false);
  /**
 * Calculate total number of likes on gallery images.
 * @type {number} A number representing the total number of likes.
 */
  const totalLikes = Object.values(likes).reduce(
    (acc, value) => acc + value,
    0
  );

  /**
 * Effect hook for loading gallery data on component mount.
 */
  useEffect(() => {
    const array = [];
     
    /**
   * Async function to load gallery data from Firestore database.
   */
    const loadData = async () => {
      const data = await getGallerie();
      await data.forEach((query) => {
        array.push({ key: query.id, gallerie: query.data() });
      });

      setGallerie(array);
    };
    loadData();
  }, []);

  /**
 * Effect hook for loading likes data on component mount.
 */
  useEffect(() => {
     /**
   * Async function to load likes data from Firestore database.
   */
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

  /**
 * Function to handle a user liking or unliking an image in the gallery.
 * @param {string} id - The ID of the image being liked or unliked.
 */
  const handleLike = (id) => {
    /**
   * Update likes state with newLikes object.
   */
    setLikes((prevLikes) => {
      /**
     * Object to store updated likes data.
     * @type {Object}
     */
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

  /**
 * Function to sort gallery data based on selected sorting method.
 * @param {Array} gallerie - The array of gallery data to be sorted.
 * @param {string} sortBy - The selected sorting method.
 * @returns {Array} - The sorted array of gallery data.
 */
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

  /**
 * Array of objects containing available sorting options for the gallery.
 * @type {Array}
 */
  const options = [
    { option: "Popularité décroissante", id: uuid() },
    { option: "Popularité croissante", id: uuid() },
    { option: "Tri par nom ↓", id: uuid() },
    { option: "Tri par nom ↑", id: uuid() },
  ];

  console.log(gallerie);

  /**
 * Function to check whether to show the "scroll to top" button.
 */
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 200){
      setShowScroll(false)
    }
  };

  /**
 * Function to scroll to the top of the window.
 */
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
 * Effect to add and remove event listener for checking whether to show the "scroll to top" button.
 */
  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
     /**
   * Remove event listener when component unmounts to prevent memory leaks.
   */
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
          <FontAwesomeIcon icon={solid("arrow-up")} className="text-orange-500 h-8 cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Gallery;
