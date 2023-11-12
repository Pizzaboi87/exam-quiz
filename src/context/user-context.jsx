import { createContext, useEffect, useState } from "react";
import {
  createUserDocumentFromAuth,
  getUserData,
  onAuthStateChangedListener,
} from "../utils/firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user, user.displayName);
        const userDatafromDB = await getUserData(user.uid);
        setUserData(userDatafromDB);
      } else {
        setUserData(null);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const [points, setPoints] = useState(0);

  const correctAnswer = () => {
    setPoints((prevPoints) => prevPoints + 1);
  };

  const wrongAnswer = () => {
    setPoints((prevPoints) => prevPoints - 0.5);
  };

  const resetPoints = () => {
    setPoints(0);
  };

  return (
    <UserContext.Provider
      value={{
        correctAnswer,
        wrongAnswer,
        resetPoints,
        points,
        currentUser,
        userData,
        tempName,
        setTempName,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
