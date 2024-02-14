
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCqJudFff0o-4Rc2GvtOalh7pHffckXlFI",
    authDomain: "resqalliance-acc36.firebaseapp.com",
    projectId: "resqalliance-acc36",
    storageBucket: "resqalliance-acc36.appspot.com",
    messagingSenderId: "375814034220",
    appId: "1:375814034220:web:afb540ac8476c3af081289",
    measurementId: "G-5XFQP77FS7"
};
const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const at = app.auth();

export default app;
