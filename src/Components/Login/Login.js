import {React, useState} from "react";
import Img from "../../Resuorse/LoginBg.jpg";
import '../../Styles/Login.scss';
import { NavLink } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMasenge, setError] = useState('')
    const auth = getAuth();


    
    function getValue (event) {
        if(event.target.id == "Email") {
            setEmail(event.target.value)
        } else if (event.target.id == "password") {
            setPassword(event.target.value)
        }  
    }

    function onLogin (e) {
        e.preventDefault();       
        const auths = getAuth();
        signInWithEmailAndPassword(auths, email, password)
        .then(props.auth())
        .catch(error => {
            const code = error.code
            validation(code)
            
        })
    }


    function validation (code) {
        if(code == "auth/invalid-email"){
            setError('Email поле пусте')
         
        } if(code == "auth/internal-error"){
            setError('поле пароля пусте')    
        } else if(code == 'auth/wrong-password') {
            setError('Пароль не правильний') 
            return
        } else if(code == 'auth/user-not-found') {
            setError('Такого корестувача не знайдено') 
            return
        }
       
    }



    return(
        <div className="flex-container" >
            <div className="col-1">
                <img src={Img} alt="" />
            </div>

            <div className="col-2 uk-position-center">
                <form onSubmit={onLogin}>
                <div className="uk-margin">
                    <input className="uk-input uk-form-success uk-width-1-1" type="text" placeholder="Email" id="Email" value={email} onChange={getValue} />
                </div>
                <div className="uk-margin">
                    <input className="uk-input uk-form-success uk-width-1-1" type="password" placeholder="Password" id="password" value={password} onChange={getValue} />
                </div>
                    <button className="uk-button uk-button-primary uk-margin-small-right">Вхід</button>
                    <NavLink to="/register" className="uk-button uk-button-danger">Регістрація</NavLink>
                    <div className="uk-alert-danger uk-margin" uk-alert={toString()}>
                        <a className="uk-alert-close" uk-close={toString()}></a>
                        <p>{errorMasenge}</p>
                    </div>
                </form>
            </div>
        </div>
    )
}; 
export default Login;