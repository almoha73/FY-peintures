// la page edit doit être identique à la page admin sauf que l'area est préremplie avec le commentaire à modifier
// le commentaire à modifier est le commentaire qui a été cliqué dans la page admincomment

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAdmin } from "../../services/fetchDatas";
//import { useForm } from "react-hook-form";
import "@tailwindcss/forms";
import { db } from "../../firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import Modal from "modalagnes73";

const Edit = () => {
  // récupérer le dernier commentaire poster le plus récent par date et heure

  const [comment, setComment] = useState([]);
  const [commentDate, setCommentDate] = useState(null);

  const [rows, setRows] = useState(10);
  const { id } = useParams();

  console.log(id);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await getAdmin();

      const array = data.docs.map((doc) => ({
        key: doc.id,
        message: doc.data(),
      }));
      // Trouver le commentaire spécifique à modifier
      const specificComment = array.find((c) => c.key === id);
      if (specificComment) {
        setComment(specificComment.message.comment);
        setCommentDate(specificComment.message.timestamp);
      }
    };
    loadData();
  }, [id]);

  console.log(comment);
  console.log(commentDate);

  useEffect(() => {
    if (window.innerWidth <= 575.98) {
      setRows(15);
    } else {
      setRows(20);
    }
  }, []);

  // function qui modifie le commentaire dans la base de données - utiliser la fonction updateDoc de firebase

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      comment: comment,
      timestamp: commentDate,
      modificationTimestamp: serverTimestamp(), // pour la base de données
    };
    try {
      await updateDoc(doc(db, "admin", id), updatedData);
      setIsOpen(true);
      // je veux que le textarea soit vide après avoir cliqué sur le bouton
      setComment("");
      setCommentDate("");
    } catch (error) {
      console.error("Failed to update the comment:", error);
    }
  };

  const convertSecondsToDateFrench = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toISOString().slice(0, 16); // format 'YYYY-MM-DDTHH:MM'
  };

  return (
    <>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          modalTitle="Message envoyé !"
          modalText="Merci beaucoup !"
          button
          buttonbg="yellow-700"
          buttonTextColor="neutral-000"
          buttonbgHover="yellow-600"
        />
      )}
      <div
        className="w-full bg-yellow-50 flex flex-col items-center"
        style={{ minHeight: "calc(100vh - 128px)" }}
      >
        <main className="box11 w-11/12 my-8 flex flex-1 flex-col items-center">
          <h1 className="text-orange-900 font-dancing text-3xl my-4">
            Messages de Francine
          </h1>
          <form className="flex flex-col w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/3">
            <input
              type="datetime-local"
              name="commentDate"
              id="commentDate"
              value={convertSecondsToDateFrench(commentDate)}
              className="p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
            />

            <textarea
              // {...register("comment", { required: true })}
              rows={rows}
              name="comment"
              id="comment"
              className="p-4  block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm "
              aria-describedby="message-max"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex-shrink-0 mt-4 mx-auto">
              <button
                onClick={handleUpdate}
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 mb-4"
              >
                Editer
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default Edit;
