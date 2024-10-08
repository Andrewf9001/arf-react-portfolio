import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  getFirestore,
  getDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [hobbies, setHobbies] = useState(null);
  const [projects, setProjects] = useState(null);

  const storage = getStorage();
  const firestore = getFirestore();

  const getProjectData = useCallback(
    async (id, type) => {
      const docRef = doc(firestore, type, id);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        return null;
      }
    },
    [firestore]
  );

  const addProject = async (data) => {
    try {
      const docRef = collection(db, data.category);

      await addDoc(docRef, data);

      console.log("Project Added");
    } catch (err) {
      console.error("Add New Project: ", err);
    }
  };

  const updateProject = async (id, data) => {
    try {
      const docRef = doc(db, data.category, id);

      await updateDoc(docRef, data);

      console.log("Update successful");
    } catch (err) {
      console.error("Error updating portfolio item: ", err);
    }
  };

  const deleteProject = async (id, category, filePaths) => {
    const { thumbPath, bannerPath, logoPath, videoPath } = filePaths;

    try {
      const deleteFile = async (filePath) => {
        if (filePath) {
          const fileRef = ref(storage, filePath);

          await deleteObject(fileRef);
        }
      };

      await Promise.all([
        deleteFile(thumbPath),
        deleteFile(bannerPath),
        deleteFile(logoPath),
        deleteFile(videoPath),
      ]);

      const docRef = doc(db, category, id);

      await deleteDoc(docRef);

      console.log("Project and associated files deleted");
    } catch (err) {
      console.error("Error deleting project: ", err);
    }
  };

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
    getProjectData,
    addProject,
    updateProject,
    deleteProject,
  };

  return (
    <AppDataContext.Provider value={values}>{children}</AppDataContext.Provider>
  );
};

export const useAppData = () => {
  return useContext(AppDataContext);
};
