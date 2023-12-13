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

export const getMessage = async () => {
  try {
    return await getDocs(collection(db, "messages"));
  } catch (error) {
    console.log(error);
  }
};

export const getValideMessage = async () => {
  try {
    return await getDocs(collection(db, "valideMessage"));
  } catch (error) {
    console.log(error);
  }
};

export const getAdmin = async () => {
  try {
    return await getDocs(collection(db, "admin"));
  } catch (error) {
    console.log(error);
  }
};

/// récupérer le dernier commentaire poster

export const getComment = async () => {
  try {
    return await getDocs(collection(db, "messages"));
  } catch (error) {
    console.log(error);
  }
};
