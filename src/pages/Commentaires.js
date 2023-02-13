import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getMessage } from "../services/fetchDatas";
import ReactMarkdown from "react-markdown";

const Commentaires = () => {
  const [message, setMessage] = useState([]);
  

  useEffect(() => {
    const array = [];
    const loadData = async () => {
      const data = await getMessage();
      await data.forEach((query) =>
        array.push({ key: query.id, message: query.data() })
      );
      setMessage(array);
    };
    loadData();
  }, [message.length]);

  console.log(message);

  return (
    <div className="w-full h-screen sm:h-screen bg-yellow-50 flex flex-col items-center">
      <Navbar />
      <main className="my-16 flex flex-col items-center">
        {message.map((elt) => (
          <div key={elt.key} className="box11 w-9/12 p-8 space-y-2 mb-2">
            
            <ReactMarkdown >{elt.message.comment}</ReactMarkdown>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Commentaires;
