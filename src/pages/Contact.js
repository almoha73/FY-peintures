import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useForm, useController } from "react-hook-form";
import Modal from "modalagnes73";
import EmojiPicker from "emoji-picker-react";
import "@tailwindcss/forms";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const docRef = await addDoc(collection(db, "messages"), data);
      console.log("Document written with ID: ", docRef.id);
      window.scrollTo(0, 0);
      setIsOpen(true);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const [rows, setRows] = useState(10);

  useEffect(() => {
    if (window.innerWidth <= 575.98) {
      setRows(15);
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
      <div className="w-full h-screen sm:h-screen bg-yellow-50 flex flex-col items-center">
        <Navbar />
        <main className="flex w-10/12 justify-center items-center h-screen">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:w-1/2 justify-center items-center"
          >
            <label
              htmlFor="comment"
              className="block text-xl mb-8 font-medium text-gray-700"
            >
              Laisser un message pour mon Livre d'Or
            </label>
            <div className="w-full mb-8">
              <textarea
                {...register("comment", { required: true })}
                rows={rows}
                name="comment"
                id="comment"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm "
                aria-describedby="message-max"
              />
            </div>

            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Envoyer
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default Contact;
