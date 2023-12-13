// faire un formulaire d'identification avec mail et mot de passe pour l'admin
// il y a un bouton pour se connecter
// on envoie les données dans l'authentification de firebase
// si le login est ok on redirige vers la page admin on affiche un check ok en vert

import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import Modal from "modalagnes73";
import { useForm } from "react-hook-form";
import "@tailwindcss/forms";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [rows, setRows] = useState(10);
  const [check, setCheck] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  const { login } = useContext(AuthContext);


  const onSubmit = async (data) => {
    console.log(data);
    try {
      await login(data.email, data.password);
      console.log("User login success");

      
      navigate("/private/admin");

      setCheck(true);
    } catch (error) {
      alert("User login failed");
      alert(error);
    }
  };

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
      <div className="w-full bg-yellow-50 flex flex-col items-center min-h-screen">
        <Navbar />
        <main className="flex flex-col flex-1 w-10/12 justify-center items-center my-4 sm:my-8 text-orange-900">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold mb-4">
            Connexion
          </h1>
          
          <form
            className="flex flex-col w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="email" className="text-xl mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-orange-900 rounded px-2 py-1 mb-4"
              {...register("email")}
            />
            <label htmlFor="password" className="text-xl mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-orange-900 rounded px-2 py-1 mb-4"
              {...register("password")}
            />
            <button
              type="submit"
              className="bg-orange-900 text-white py-2 rounded hover:bg-orange-700 transition duration-500 ease-in-out"
            >
              Se connecter
            </button>
          </form>

          {check && (
            <div className="flex items-center justify-center mt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-green-500 font-bold">Connexion réussie</p>
            </div>
          )}

          {check && (
            <>
              <form
                className="flex flex-col w-full sm:w-3/4 md:w-1/2 lg:w-2/3"
                onSubmit={handleSubmit(onSubmitAdmin)}
              >
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

                <div className="flex-shrink-0 mt-4 mx-auto">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Login;
