import React, { useState, useEffect } from "react";
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
      const filteredArray = array.filter((item => item.parcours.name !== "Francine")).sort((a,b) => a.parcours.order - b.parcours.order)
      console.log(filteredArray );
      setParcours(filteredArray );
    };
    loadData();
  }, [parcours.lenght]);

  console.log(parcours);

  return (
    <div className="w-full min-h-screen bg-yellow-50 flex flex-col items-center">
      <main className="flex-1 w-10/12 my-8">
        <h1 className="font-dancing text-2xl lg:text-4xl text-center mb-8">
          Comment vivre sa passion malgré un lourd handicap
        </h1>
        <div className="md:grid grid-cols-2 place-items-center gap-4 border p-4 box17">
          <div className="clip-path-decagon flex justify-center h-[300px] w-11/12 sm:w-[400px] mx-auto md:w-[300px] lg:w-[400px] lg:h-[400px] bg-cover bg-center">
            {/* <p className="text-white text-4xl  mt-8 text-yellow-50">Francine</p> */}
          </div>
          <div className="col-span-1">
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

        <div className="mt-8 lg:mt-12">
          <p className="text-justify ">
            <span className="font-dancing text-xl ">P</span>our que je puisse peindre, on
            surélève une table à l'aide de deux tréteaux en bois très solides.
            Sur cette table, il y a mon chevalet, et posée devant mon chevalet, il
            y a ma palette d'aquarelle. A ma gauche se trouve mon pot d'eau (bien lourd
            pour ne pas le renverser), et sous ce pot, un bout de chiffon qui me
            sert à essuyer mes pinceaux. <br /> <span className="font-dancing text-xl ">C</span>omme vous pouvez le constater, je n'ai
            pas l'usage de mes mains, alors vous allez penser : « mais comment
            fait-elle ??????? »  <br /> <span className="font-dancing text-xl ">A</span>utour de ma tête, j'ai un casque avec une
            longue tige au bout de laquelle se trouve un embout avec une vis
            pour tenir le pinceau. On appelle ce dispositif une licorne. <br />  <span className="font-dancing text-xl ">M</span>on
            cours de peinture se déroule tous les mardi matin de 10H à 12H30, à
            l'Amicale Laïque de la Glacière à Mérignac. Il est animé par un super professeur. <br />  <span className="font-dancing text-xl ">N</span>ous
            sommes huit personnes mais je suis la seule en situation de handicap
            (enfin, handicap visible!!!). Pour m'aider j'ai des auxiliaires de
            vie, Célia et Estelle. Elles m’aident pour me préparer moi, préparer
            tout mon matériel, et me tourner les toiles quand j’en ai besoin,
            car j’ai la facilité de savoir peindre dans tous les sens !!{" "}
          </p>
          <div className="w-fit md:mx-auto lg:mx-auto columns-1 lg:columns-2 xl:columns-3 2xl:columns-4 space-y-4 mt-4 place-items-center">
          {
            
            parcours.map((elt) => (
              // si elt.parcours.href contient "JPG" alors on affiche une image sinon on affiche la vidéo //
              elt.parcours.href.includes("JPG") ? <img className="w-80 rounded-lg md:w-[400px] shadow-lg max-h-96 object-cover" key={elt.key} src={elt.parcours.href} alt={elt.parcours.name} /> : <video className="w-80 rounded-lg md:w-[400px] shadow-lg max-h-96 object-cover" key={elt.key} src={elt.parcours.href} alt={elt.parcours.name} controls></video>
            ))
            
          }
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Parcours;
