import React, { useState } from "react";
import Img from "../../Resuorse/LoginBg.jpg";
import '../../Styles/Login.scss';
import { NavLink } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../..";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMasenge, setError] = useState('');
    const [userName, setName] = useState('');
    const auth = getAuth()


    function getValue (event) {
        if(event.target.id == "Email") {
            setEmail(event.target.value);
        } else if (event.target.id == "password") {
            setPassword(event.target.value);
        } else if(event.target.id == "name"){
            setName(event.target.value);
        } 
    }
    
   async function setDataUsers() {
     const auth = getAuth() 
     let user    
     await createUserWithEmailAndPassword(auth, email, password)
        .then(res => addUsersToData(res.user))
        .catch(error => {
            const code = error.code;
            if(code == "auth/email-already-in-use") {
                setError('Email уже існує')
                return
            }
        })

        updateProfile(auth.currentUser, {
            displayName: userName
        })
   
    }


   async function addUsersToData(user) {
        await setDoc(doc(db, "users",  user.uid), {
            name: userName,
            id: user.uid,
            online: false
          });

    }

    function validation (e) {
        e.preventDefault();
        if(email.length <= 0) {
            setError('Email поле пусте');
            return
        } else if(password.length <= 0) {
            setError('Пароль не заповнино');
            return
        } else if(password.length <= 5) {
            setError('Пароль не може бути менше 6 символів');
            return
        } 
        setError('')
        setDataUsers();
    }

    return(
        <div className="flex-container" >
            <div className="col-1">
                <img src={Img} alt="" />
            </div>

            <div className="col-2 uk-position-center">
                <form action="" onSubmit={validation}>
                <div className="uk-margin">
                    <input className="uk-input uk-form-success uk-width-1-1" type="text" placeholder="Name"  id="name" value={userName} onChange={getValue}/>
                </div>
                <div className="uk-margin">
                    <input className="uk-input uk-form-success uk-width-1-1" type="text" placeholder="Email" id="Email" value={email} onChange={getValue}/>
                </div>
                <div className="uk-margin">
                    <input className="uk-input uk-form-success uk-width-1-1" type="password" placeholder="Password"  id="password" value={password} onChange={getValue} />
                </div>
                    <NavLink to="/" className="uk-button uk-button-danger uk-margin-small-right">Вхід</NavLink>
                    <button className="uk-button uk-button-primary">Регістрація</button>
                    <div className="uk-alert-danger uk-margin" uk-alert={toString()}>
                        <a className="uk-alert-close" uk-close={toString()}></a>
                        <p>{errorMasenge}</p>
                    </div>
                </form>
            </div>
        </div>
    )
}; 
export default Register;