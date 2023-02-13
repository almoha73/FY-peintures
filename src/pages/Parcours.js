import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getParcours } from "../services/fetchDatas";

const Parcours = () => {
  const [parcours, setParcours] = useState([]);

  useEffect(() => {
    const array = [];
    const loadData = async () => {
      const data = await getParcours();
      await data.forEach((query) =>
        array.push({ key: query.id, parcours: query.data() })
      );
      setParcours(array);
    };
    loadData();
  }, [parcours.lenght]);

  console.log(parcours);

  return (
    <div className="w-full sm:h-screen bg-yellow-50 flex flex-col items-center">
      <Navbar />
      <main className="flex-1 w-10/12 my-8">
        <div className="sm:grid grid-cols-3 place-items-center gap-4 border p-4 box17 my-8">
          <div className="clip-path-decagon flex justify-center h-[300px] sm:w-[300px] sm:h-[400px] bg-cover bg-center">
            {/* <p className="text-white text-4xl  mt-8 text-yellow-50">Francine</p> */}
          </div>
          <div className="col-span-2">
            <p>
              {" "}
              <span className="font-dancing text-xl">J</span>e suis Francine,
              j'ai 52 ans. Je suis handicapée de naissance suite à une
              réanimation de 1h40. <br />
              <span className="font-dancing text-xl">J</span>'ai suivi une
              scolarité ordinaire où j'ai eu la chance d'avoir un professeur
              rien que pour moi ! <br />
              <span className="font-dancing text-xl">L</span>a peinture est une
              passion que je pratique maintenant depuis plusieurs années,
              d'abord à Joué Les Tours où j'ai vécu, et aujourd'hui à Mérignac
              en Gironde.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Parcours;
