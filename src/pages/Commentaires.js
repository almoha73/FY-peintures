import React, { useState, useEffect } from "react";
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
      console.log(array);
      array.sort((a,b) => b.message.timestamp - a.message.timestamp)
      setMessage(array);
    };
    loadData();
  }, [message.length]);

  console.log(message);

   return (
    <div
      className="w-full bg-yellow-50 flex flex-col items-center"
      style={{ minHeight: 'calc(100vh - 128px)' }}
    >
      <main className="box11 w-11/12 my-8 flex flex-1 flex-col items-center">
        {message.length > 0 &&
          message.map((elt) => (
            <React.Fragment key={elt.key}>
              <div className="w-full p-8 space-y-2 mb-2">
                <p className="text-xl text-orange-900">
                  Message de {elt.message.name}
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
              </div>
              <hr className="w-11/12"/>
            </React.Fragment>
          ))}
      </main>
    </div>
  );
};

export default Commentaires;
