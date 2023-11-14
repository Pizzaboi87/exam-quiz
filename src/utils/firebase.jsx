import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref as refStr, getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const database = getDatabase();
export const storage = getStorage();

export const createUserDocumentFromAuth = async (userAuth, displayName) => {
  if (!userAuth || !displayName) return;

  const { email, uid } = userAuth;
  const userDocRef = doc(db, "users", uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
      });
    } catch (error) {
      console.log("error during create the user", error.message);
    }
  }

  await updateProfile(userAuth, { displayName });

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnapShot = await getDoc(userDocRef);

    if (userSnapShot.exists()) {
      const userData = userSnapShot.data();
      return userData;
    }
  } catch (error) {
    console.error("Error during the fetch of user's data: ", error);
    throw error;
  }
};

export const getData = async (branch) => {
  const dataRef = ref(database, branch);
  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const updateUserData = async (uid, data) => {
  const userDocRef = doc(db, "users", uid);

  try {
    await setDoc(userDocRef, data, { merge: true });
  } catch (error) {
    console.error("Error during the update of user's data: ", error);
    throw error;
  }
};

export const storeResult = async (currentUser, result) => {
  const data = await getData(`championship/${currentUser.displayName}`);
  if (data) {
    if (data.result < result) {
      try {
        await set(ref(database, `championship/${currentUser.displayName}`), {
          name: currentUser.displayName,
          result: result,
        });
        return true;
      } catch (error) {
        console.error("An error occurred while storing result.", error);
        return false;
      }
    } else {
      return false;
    }
  } else {
    try {
      await set(ref(database, `championship/${currentUser.displayName}`), {
        name: currentUser.displayName,
        result: result,
      });
      return true;
    } catch (error) {
      console.error("An error occurred while storing result.", error);
      return false;
    }
  }
};

export const getQuestionImage = async (image) => {
  const imageRef = refStr(storage, `questions/${image}`);

  try {
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error("An error occurred while downloading photo URL.", error);
    const downloadURL =
      "https://firebasestorage.googleapis.com/v0/b/exam-quiz-5f59a.appspot.com/o/questions%2Flost.gif?alt=media&token=1d9a7923-736f-4687-9507-e4683cf7bbf8";
    return downloadURL;
  }
};
