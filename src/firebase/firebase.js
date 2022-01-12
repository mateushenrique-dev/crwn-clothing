import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyAAieLo4EJhmfAFUJfk5ibff1009iUJJWU",
  authDomain: "crwn-db-e8b43.firebaseapp.com",
  projectId: "crwn-db-e8b43",
  storageBucket: "crwn-db-e8b43.appspot.com",
  messagingSenderId: "47166224166",
  appId: "1:47166224166:web:736737bc6e58cf54d2b3e7",
  measurementId: "G-2D57JYBBSX",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {

  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email, displayName } = userAuth.multiFactor.user;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        displayName,
        createdAt,
        ...additionalData,
      });
    } catch {
      console.log("error creating user");
    }
  }

  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
