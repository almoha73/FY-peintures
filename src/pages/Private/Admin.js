

import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import Modal from "modalagnes73";
import { useForm } from "react-hook-form";
import "@tailwindcss/forms";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Admin = () => {
  const { register, handleSubmit, reset } = useForm();
  const [rows, setRows] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmitAdmin = async (data) => {
    console.log(data);
    try {
      // Ajout du champ timestamp avec la valeur du serveur Firestore
      data.timestamp = serverTimestamp();

      const docRef = await addDoc(collection(db, "admin"), data);
      console.log("Document written with ID: ", docRef.id);
      window.scrollTo(0, 0);
      setIsOpen(true);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 575.98) {
      setRows(11);
    } else {
      setRows(20);
    }
  }, []);

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
        className="w-full bg-yellow-50 flex flex-col items-center h-screen"
        
      >
        <Navbar />
        <main className="flex flex-col flex-1 justify-center  text-orange-900">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold mb-4">
            Messages de Francine
          </h1>
          <form
            className="flex flex-col sm:w-3/4 lg:w-2/3 mx-auto"
            onSubmit={handleSubmit(onSubmitAdmin)}
          >
            <label
              htmlFor="comment"
              className="block sm:text-xl text-center font-medium  sm:mb-4 mb-2 text-orange-900"
            >
              Que veux-tu dire aujourd'hui ?
            </label>
            <textarea
              {...register("comment", { required: true })}
              rows={rows}
              name="comment"
              id="comment"
              className="block rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm "
              aria-describedby="message-max"
            />

            <div className="flex-shrink-0 mt-4 mx-auto">
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Envoyer
              </button>
            </div>
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Admin;
