import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getParcours = async () => {
    try {
      return await getDocs(collection(db, "parcours"));
    } catch (error) {
      console.log(error);
    }
  };

  export const getGallerie = async () => {
    try {
      return await getDocs(collection(db, "gallerie"));
    } catch (error) {
      console.log(error);
    }
  };