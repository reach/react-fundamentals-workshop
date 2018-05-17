import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAGItcrds_ukT3oLiRDDY91fDWab9i6-Sg",
  authDomain: "workshop-chat-app-bf401.firebaseapp.com",
  databaseURL:
    "https://workshop-chat-app-bf401.firebaseio.com",
  projectId: "workshop-chat-app-bf401",
  storageBucket: "workshop-chat-app-bf401.appspot.com",
  messagingSenderId: "755065439036"
};

firebase.initializeApp(config);

const db = firebase.database();
const provider = new firebase.auth.GithubAuthProvider();

const ReservedRefNameChars = /[.#$[\]]/g;

const escapeKey = name =>
  name.replace(ReservedRefNameChars, "_");

const escapeValue = rawValue => {
  const value =
    rawValue && typeof rawValue.toJSON === "function"
      ? rawValue.toJSON()
      : rawValue;

  if (value == null) return null; // Remove undefined values

  if (Array.isArray(value)) return value.map(escapeValue);

  if (typeof value === "object") {
    return Object.keys(value).reduce((memo, key) => {
      memo[escapeKey(key)] = escapeValue(value[key]);
      return memo;
    }, {});
  }

  return value;
};

const MessagesRef = db.ref("messages");

let serverTimeOffset = 0;
db
  .ref(".info/serverTimeOffset")
  .on("value", function(snapshot) {
    serverTimeOffset = snapshot.val();
  });

const saveAuth = auth =>
  db.ref("users/" + auth.uid).set(escapeValue(auth));

export const login = callback => {
  firebase.auth().onAuthStateChanged(auth => {
    if (auth) {
      console.log(auth);
      const user = {
        photoURL: auth.photoURL,
        displayName: auth.displayName,
        uid: auth.uid
      };
      saveAuth(user);
      callback(null, user);
    } else {
      firebase
        .auth()
        .signInWithRedirect(provider)
        .catch(error => {
          callback(error);
        });
    }
  });
};

export const sendMessage = (user, text) => {
  MessagesRef.push({
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    timestamp: Date.now() + serverTimeOffset,
    text
  });
};

export const subscribeToMessages = callback => {
  function handleValue(snapshot) {
    const messages = [];

    snapshot.forEach(function(s) {
      const message = s.val();
      message._key = s.key;
      messages.push(message);
    });

    callback(messages);
  }

  MessagesRef.on("value", handleValue);

  return function() {
    MessagesRef.off("value", handleValue);
  };
};
