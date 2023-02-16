import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useForm} from "react-hook-form";
import Modal from "modalagnes73";
import "@tailwindcss/forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid} from "@fortawesome/fontawesome-svg-core/import.macro";

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
      <div className="w-full h-auto sm:h-screen md:h-screen lg:h-auto bg-yellow-50 flex flex-col items-center">
        
        <main className="flex flex-col flex-1 w-10/12 justify-center items-center my-4 sm:my-8 text-orange-900">
          <a href="mailto:francine.yollant@netcourrier.com" className="flex items-center mb-4"><FontAwesomeIcon icon={solid("at")} className=" w-8 h-8 p-1 text-orange-500 rounded-lg"/><span>Mail</span></a>
          <span>OU</span>
          <hr />
          <p className="mt-4 text-center font-dancing text-3xl sm:text-4xl mb-4 ">Laissez-moi un message sur mon livre d'or</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:w-1/2 justify-center items-center"
          >
            <label
              htmlFor="name"
              className="block sm:text-xl text-center font-medium text-gray-700 sm:mb-4 mb-2 text-orange-900"
            >
              Nom
            </label>
            <input {...register("name", { required: true })} type="text" name="name" id="name" className="outline-none mb-4 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500" />
            <div className="w-full mb-4 ">
            <label
              htmlFor="comment"
              className="block sm:text-xl text-center font-medium text-gray-700 sm:mb-4 mb-2 text-orange-900"
            >
              Votre message
            </label>
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
