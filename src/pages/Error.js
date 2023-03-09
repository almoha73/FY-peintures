import React from "react";

const Error = () => {
  return (
    <div className="w-full h-screen bg-yellow-50 flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/perso-6e317.appspot.com/o/Photos%2Fpages_sites%2Falmoha_un_pinceau_de_peintre_perdu_dans_le_desert_141778f0-1635-4110-9e6f-216f1951c522.png?alt=media&token=05ea1954-3865-4545-8c48-666093d6c416')" }}>

      <main className="flex flex-1 flex-col justify-center w-10/12 items-center h-full">
        <h1 className='w-full flex-1 text-9xl text-white flex items-center justify-start text-[#89878A]'>
          Error
        </h1>
      </main>
    </div>
  );
};

export default Error;
