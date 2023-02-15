import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getValideMessage } from "../services/fetchDatas";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const Commentaires = () => {
  const [message, setMessage] = useState([]);
  

  useEffect(() => {
    const array = [];
    const loadData = async () => {
      const data = await getValideMessage();
      await data.forEach((query) =>
        array.push({ key: query.id, message: query.data() })
      );
      setMessage(array);
    };
    loadData();
  }, [message.length]);

  console.log(message);

  return (
    <div className="w-full h-screen bg-yellow-50 flex flex-col items-center">
      <Navbar />
      <main className="my-8 flex flex-1 flex-col items-center">
        {message.length > 0 ? (message.map((elt) => (
          <div key={elt.key} className="box11 w-9/12 p-8 space-y-2 mb-2">
            
            <p className="text-xl text-orange-900">Message de {elt.message.name}</p>
            <FontAwesomeIcon icon={solid("quote-left")} className="text-orange-500 h-8" />
            <ReactMarkdown className="italic">{elt.message.comment}</ReactMarkdown>
            <FontAwesomeIcon icon={solid("quote-right")} className="float-right text-orange-500 h-8"/>
          </div>
        ))) : <></>}
      </main>
      <Footer />
    </div>
  );
};

export default Commentaires;
