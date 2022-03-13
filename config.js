import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD8sIFafShSQHkql2D1Uiru4I9_HDlJ6sI",
  authDomain: "societymanagementapp-69c84.firebaseapp.com",
  projectId: "societymanagementapp-69c84",
  databaseURL: "societymanagementapp-69c84.firebaseio.com",
  storageBucket: "societymanagementapp-69c84.appspot.com",
  messagingSenderId: "457401431672",
  appId: "1:457401431672:web:6914ee6c901d3a314a9f8d",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
