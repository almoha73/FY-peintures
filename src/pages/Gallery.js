import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import { getGallerie } from '../services/fetchDatas';

const Gallery = () => {
  const [gallerie, setGallerie] = useState([]);

  useEffect(() => {
    const array = [];
    const loadData = async () => {
      const data = await getGallerie();
      await data.forEach((query) =>
        array.push({ key: query.id, gallerie: query.data() })
      );
      setGallerie(array);
    };
    loadData();
  }, [gallerie.lenght]);

  console.log(gallerie);
  return (
    <div className='w-full h-auto sm:h-screen bg-yellow-50 flex flex-col items-center'>
      <Navbar />
      <main className='sm:ml-1/12 sm:columns-2 lg:columns-3 xl:columns-4 sm:gap-8 box17 p-4 my-16'>
      {gallerie.map((elt) => (
        <img src={elt.gallerie.href} alt="" className='w-[300px] rounded shadow shadow-lg mb-4' key={elt.key}/>
      ))}
      </main>
        
    </div>
  )
}

export default Gallery