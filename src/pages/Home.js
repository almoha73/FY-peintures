import React from "react";
import Navbar from "../components/Navbar";




const Home = () => {
  return (
    <div className="w-full bg-yellow-50 flex flex-col items-center min-h-screen">
      <Navbar />
      <main className="flex flex-1 flex-col justify-center w-10/12 items-center  ">
        <p className="text-4xl font-dancing">Artiste et handicap</p>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/francine-94efd.appspot.com/o/logo%2FlogoText.png?alt=media&token=4d2444ad-404f-4d77-9cc6-4a0751bcb924"
          alt=""
        />
      </main>
     
    </div>
  );
};

export default Home;
