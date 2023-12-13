import React, { useState, useEffect, useContext } from "react";
import { getAdmin } from "../services/fetchDatas";

import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminComment = () => {
  const [messageFrancine, setMessageFrancine] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const array = [];
    const loadData = async () => {
      const data = await getAdmin();
      await data.forEach((query) =>
        array.push({ key: query.id, message: query.data() })
      );
      // classer les messages par date décroissante
      array.sort((a, b) => b.message.timestamp - a.message.timestamp);

      setMessageFrancine(array);

      console.log(array);
    };
    loadData();
  }, [messageFrancine.length]);

  console.log(messageFrancine);

  function convertSecondsToDateFrench(seconds) {
    // Créer une nouvelle date à partir des secondes
    const date = new Date(seconds * 1000); // Multiplier par 1000 car JavaScript utilise des millisecondes

    // Extraire les composantes de la date
    let minute = date.getMinutes();
    const hour = date.getHours();
    let day = date.getDate();
    let month = date.getMonth() + 1; // Les mois commencent à 0 en JavaScript
    const year = date.getFullYear();

    // Ajouter un zéro devant les jours et les mois s'ils sont inférieurs à 10
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    minute = minute < 10 ? "0" + minute : minute;

    // Retourner la date formatée en format français (JJ/MM/AAAA)
    return `${day}/${month}/${year} à ${hour}h${minute}`;
  }

  const onSubmitEdit = async (data) => {
    console.log(data);
    try {
      // naviguer vers la page edit en récupérant l'id du commentaire à modifier

      navigate(`/private/edit/${data}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-full bg-yellow-50 flex flex-col items-center min-h-screen"
      
    >
      <Navbar />
      <main className="box11 w-11/12 my-8 flex flex-1 flex-col items-center">
        <h1 className="text-orange-900 font-dancing text-3xl mt-4">
          Messages de Francine
        </h1>
        {messageFrancine &&
          messageFrancine?.length > 0 &&
          messageFrancine?.map((elt) => (
            <React.Fragment key={elt.key}>
              <div className="w-full p-8 space-y-2 mb-2">
                <p className="text-xl text-orange-900">
                  {elt.message.modificationTimestamp && (
                    <span className="text-sm text-gray-500">
                      {`${convertSecondsToDateFrench(
                        elt.message.timestamp.seconds
                      )} ----> Modifié le ${convertSecondsToDateFrench(
                        elt.message.modificationTimestamp.seconds
                      )}`}
                    </span>
                  )}
                </p>
                <FontAwesomeIcon
                  icon={solid("quote-left")}
                  className="text-orange-500 h-8"
                />
                <ReactMarkdown className="italic">
                  {elt.message.comment}
                </ReactMarkdown>
                <FontAwesomeIcon
                  icon={solid("quote-right")}
                  className="float-right text-orange-500 h-8"
                />
                {/* bouton edit fontawesome */}

                {currentUser && (
                  <>
                    <button
                      className="text-orange-900 text-lg font-bold hover:text-orange-700 mr-4"
                      onClick={() => onSubmitEdit(elt.key)}
                    >
                      <FontAwesomeIcon
                        icon={solid("edit")}
                        className="text-orange-500 h-6"
                      />
                    </button>
                    <button
                      className="text-orange-900 text-lg font-bold hover:text-orange-700"
                      onClick={() => navigate("/private/admin")}
                    >
                      <FontAwesomeIcon
                        icon={solid("plus")}
                        className="text-orange-500 h-6"
                      />
                    </button>
                  </>
                )}
              </div>
              <hr className="w-11/12" />
            </React.Fragment>
          ))}
      </main>
      <Footer />
    </div>
  );
};

export default AdminComment;
