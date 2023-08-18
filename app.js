import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
    onValue,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyCJAJoct7QXdFa-oYeKU5Asx4DIDXh80VU",
    authDomain: "signup-page-e313a.firebaseapp.com",
    projectId: "signup-page-e313a",
    storageBucket: "signup-page-e313a.appspot.com",
    messagingSenderId: "91046265336",
    appId: "1:91046265336:web:2e5d60f2d8242a11dd960d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getDatabase();


let password = document.querySelector('.password')
let email = document.querySelector('.email')
let loginpassword = document.querySelector('.loginPassword')
let loginemail = document.querySelector('.loginEmail')
let signInBtn = document.querySelector('.signInBtn')
let signUpBtn = document.querySelector('.signUpBtn')
// console.log(signInBtn);

signUpBtn.addEventListener('click', () => {

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {

            const user = userCredential.user;
            set(ref(db,`user/${user.uid}`),{
                    email : email.value,
                    password : password.value

            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);

        });

})


signInBtn.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, loginemail.value, loginpassword.value)
        .then((userCredential) => {

            const user = userCredential.user;
            onValue(ref(db,`user/${user.uid}`),(data)=>{
                console.log( "data>=====", data.val());
            })
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
})