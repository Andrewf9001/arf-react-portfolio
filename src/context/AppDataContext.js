import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../services/firebase";

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [hobbies, setHobbies] = useState(null);
  const [projects, setProjects] = useState(null);

  console.log("hobbies", hobbies);
  console.log("projects", projects);

  useEffect(() => {
    const unsubscribeHobbies = onSnapshot(
      collection(db, "Hobbies"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setHobbies(data);
      },
      (err) => {
        console.error("Fetch Hobbies: ", err);
      }
    );

    const unsubscribeProjects = onSnapshot(
      collection(db, "Projects"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(data);
      },
      (err) => {
        console.error("Fetch Projects: ", err);
      }
    );

    return () => {
      unsubscribeHobbies();
      unsubscribeProjects();
    };
  }, []);

  const values = {
    hobbies,
    projects,
  };

  return (
    <AppDataContext.Provider value={values}>{children}</AppDataContext.Provider>
  );
};

export const useAppData = () => {
  return useContext(AppDataContext);
};
