import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCrpxUibXU7WXJYlHTRPs86YBFOKvr7gbQ",
    authDomain: "reactjs-productable.firebaseapp.com",
    databaseURL: "https://reactjs-productable.firebaseio.com",
    projectId: "reactjs-productable",
    storageBucket: "reactjs-productable.appspot.com",
    messagingSenderId: "720388696648"
  };
var fire = firebase.initializeApp(config);
export default fire;